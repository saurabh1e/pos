import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from '../../../../common/services/product.service';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {StockService} from '../../../../common/services/stock.service';
import {CartService} from '../cart/cart-service';
import {Stock} from '../../../../common/models/stock';
import {Product} from '../../../../common/models/product';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
  providers: [ProductService, StockService]
})
export class ProductSearchComponent implements OnInit {

  filteredProducts: Observable<{ name: string, id: number }>;
  searchCtrl: FormControl;
  @Output() onSelection: EventEmitter<{ product: Product, stocks: Stock[] }> = new EventEmitter();

  constructor(private _product: ProductService,
              private _stock: StockService,
              private _cart: CartService) {
  }

  ngOnInit() {
    this.searchCtrl = new FormControl();
    this.searchCtrl.valueChanges
      .subscribe(name => {
        if (typeof name === 'string' && name) {
          this.filteredProducts = this.getProducts(name);
        } else {

        }
      });
  }

  getProducts(value: string) {
    return this._product.query({
      __name__contains: value,
      __only: ['id', 'name', 'taxes'],
      __limit: 25
    }).map(res => res.data);
  }

  async onSelect(event: MatAutocompleteSelectedEvent) {
    this.searchCtrl.reset();
    const product = event.option.value;
    let stocks: Stock[] = [];
    try {
      stocks = await this.getStock(product.id);
    } catch (err) {
    }

    this.onSelection.emit({product, stocks});
  }

  async getStock(id: number): Promise<Stock[]> {
    return new Promise<Stock[]>((resolve, reject) => this._stock.query({
      __product_id__equal: id, __is_sold__bool: false, __include: ['units_sold']
    }).map(res => res.data.filter(r => r.units_sold < r.units_purchased)).subscribe(res => resolve(res), () => reject()));
  }
}

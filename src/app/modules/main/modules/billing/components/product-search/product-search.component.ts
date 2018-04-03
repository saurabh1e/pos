import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../../common/services/product.service';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {StockService} from '../../../../common/services/stock.service';
import {CartService} from '../cart/cart-service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
  providers: [ProductService, StockService]
})
export class ProductSearchComponent implements OnInit {

  filteredProducts: Observable<{ name: string, id: number }>;
  searchCtrl: FormControl;

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

  async addProduct(event: MatAutocompleteSelectedEvent) {
    this.searchCtrl.reset();
    const product = event.option.value;
    const stock = await this.getStock(product.id);
    this._cart.addItem(product, stock[0]);

  }

  async getStock(id: number) {
    return this._stock.query({
      __product_id__equal: id
    }).map(res => res.data).toPromise();
  }
}

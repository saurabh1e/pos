import {Component, OnInit} from '@angular/core';
import {CartService} from '../cart/cart-service';
import {Order} from '../../../../common/models/order';
import {Product} from '../../../../common/models/product';
import {Stock} from '../../../../common/models/stock';
import {MatCheckboxChange, MatDialog} from '@angular/material';
import {AddStockComponent} from '../../../inventory/add-stock/add-stock.component';
import {Item} from '../../../../common/models/item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  entryComponents: [AddStockComponent]
})
export class ProductListComponent implements OnInit {

  cart: Order;

  constructor(public _cart: CartService, private _dialog: MatDialog) {
  }

  async ngOnInit() {
    this.cart = await this._cart.cart$;
  }

  async addToCart(event: { product: Product, stocks: Stock[] }) {
    if (!event.stocks.length) {
      try {
        const stock = await this.showStockDialog(event.product.id);
        event.stocks.push(stock);
      } catch (err) {
      }

    }
    if (event.stocks.length) {
      this._cart.addItem(event.product, event.stocks[0]);
    }
  }

  async showStockDialog(productId: number): Promise<Stock> {
    const _dialog = this._dialog.open(AddStockComponent, {minWidth: '400px'});
    _dialog.componentInstance.productId = productId;
    return new Promise<Stock>((resolve, reject) => {
      _dialog.afterClosed().subscribe(res => res ? resolve(res) : reject());
    });
  }

  updateQuantity(item: Item, quantity) {
    item.quantity += quantity;
    this.updateItem(item);
  }

  changeStock(event: MatCheckboxChange, item: Item) {
    item.stock_adjust = event.checked;
    this.updateItem(item);
  }

  updateItem(item: Item) {
    this.cart = this._cart.updateItem(item);
  }
}

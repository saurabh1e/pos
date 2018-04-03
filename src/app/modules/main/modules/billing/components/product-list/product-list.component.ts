import {Component, OnInit} from '@angular/core';
import {CartService} from '../cart/cart-service';
import {Order} from '../../../../common/models/order';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  cart: Order;

  constructor(public _cart: CartService) {
  }

  ngOnInit() {
    this.cart = this._cart.cart;
  }

  addToCart(event: number) {
    console.log(event);
  }
}

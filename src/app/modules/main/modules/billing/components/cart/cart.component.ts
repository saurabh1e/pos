import {Component, OnInit} from '@angular/core';
import {CartService} from './cart-service';
import {Order} from '../../../../common/models/order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Order;

  constructor(public _cart: CartService) {
  }

  ngOnInit() {
    this.cart = this._cart.cart;
    console.log(this.cart);
  }

}

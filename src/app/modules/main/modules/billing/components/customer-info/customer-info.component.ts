import {Component, OnInit} from '@angular/core';
import {Customer} from '../../../../common/models/customer';
import {CartService} from '../cart/cart-service';
import {Order} from '../../../../common/models/order';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {

  customer: Customer = <Customer>{};
  doctor: string = null;
  cart: Order;

  constructor(private _cart: CartService) {
  }

  async ngOnInit() {
    this.cart = await this._cart.cart$;
    this.customer = this.cart && this.cart.customer ? this.cart.customer : <Customer>{};
    this.doctor = this.cart && this.cart.doctor ? this.cart.doctor : null;
  }

  async save() {
    this.cart = await this._cart.cart$;
    this.cart.customer = this.customer;
    this.cart.doctor = this.doctor;
    this._cart.cart = this.cart;
  }
}

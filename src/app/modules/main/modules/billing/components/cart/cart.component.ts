import {Component, OnInit, ViewChild} from '@angular/core';
import {CartService} from './cart-service';
import {Order} from '../../../../common/models/order';
import {OrderService} from '../../../../common/services/order.service';
import {Router} from '@angular/router';
import {PrintBillComponent} from '../../../../common/components/print-bill/print-bill.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [OrderService]
})
export class CartComponent implements OnInit {

  cart: Order;
  @ViewChild('print')
  private print: PrintBillComponent;

  constructor(public _cart: CartService, private _order: OrderService, private _router: Router) {
  }

  async ngOnInit() {
    this.cart = await this._cart.cart$;
    this._cart.cart$$.subscribe(res => {
      this.cart = res;
    });
  }

  async checkout() {
    this.cart.is_draft = false;
    const cart = await this.saveOrder();
    this.cart.id = cart.id;
    this.cart.invoice_number = cart.invoice_number;
    this.cart.created_on = cart.created_on;
    this.print.cart = this.cart;
    this.print.directPrint();
    this._cart.newCart();
    this._router.navigate(['/']);
  }

  async draft() {
    this.cart.is_draft = true;
    await this.saveOrder();
    this.print.directPrint();
    this._cart.newCart();
    this._router.navigate(['/']);
  }

  async saveOrder(): Promise<Order> {
    if (this.cart.id) {
      return this._order.update(this.cart.id, this.cart).toPromise();
    } else {
      return this._order.create(this.cart).map(res => res.data[0]).toPromise();
    }
  }
}

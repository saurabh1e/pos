import {Injectable} from '@angular/core';
import {Order} from '../../../../common/models/order';
import {Product} from '../../../../common/models/product';
import {Item} from '../../../../common/models/item';
import {Stock} from '../../../../common/models/stock';
import {ItemTax} from '../../../../common/models/itemtax';
import {AsyncLocalStorage} from 'angular-async-local-storage';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

function round(value, precision, roundOff?: boolean) {
  const multiplier = Math.pow(10, precision || 0);
  const newVal = Math.round(value * multiplier) / multiplier;
  return roundOff ? round(newVal, 0) : newVal;
}

@Injectable()
export class CartService {

  constructor(protected localStorage: AsyncLocalStorage) {
    this.init().then();
  }

  _cart: Order;
  private _cart$$ = new BehaviorSubject<Order>(null);

  get cart$$(): Observable<Order> {
    return this._cart$$.asObservable();
  }

  get cart$(): Promise<Order> {
    return new Promise<Order>(resolve => {
      this.cart ? resolve(this.cart) : this.localStorage.getItem('cart').subscribe(res => resolve(res),
        () => {
          this.newCart();
          resolve(this.cart);
        });
    });
  }

  get cart(): Order {
    return this._cart;
  }

  set cart(cart: Order) {
    this._cart = cart;
    this.localStorage.setItem('cart', cart).subscribe();
    this._cart$$.next(cart);
  }

  static createItem(product: Product, stock: Stock): Item {
    const item = <Item>{};
    item.product_id = product.id;
    item.stock_id = stock.id;
    item.stock = stock;
    item.name = product.name;
    item.stock_adjust = false;
    item.quantity = 1;
    item.unit_price = stock.selling_amount;
    item.taxes = [];
    product.taxes.forEach((value) => {
      const tax = <ItemTax>{tax_id: value.id, tax_value: value.value, tax_name: value.name};
      item.taxes.push(tax);
    });
    return item;
  }

  newCart() {
    this.cart = <Order>{items: [], sub_total: 0, total: 0, discount_value: 0};
  }

  async init() {
    this.cart = await this.localStorage.getItem('cart').toPromise();
    if (!this.cart) {
      this.cart = <Order>{items: [], sub_total: 0, total: 0, discount_value: 0};
    }
    console.log(this.cart);
  }

  updateItem(item: Item) {
    const index = this.cart.items.findIndex(cartItem => cartItem.stock_id === item.stock_id && cartItem.product_id === item.product_id);
    if (item.quantity) {
      this.cart.items[index] = item;
    } else {
      this.cart.items.splice(index, 1);
    }

    return this.calcTotal();
  }

  calcTotal(): Order {
    const cart = this.cart;
    cart.sub_total = 0;
    cart.taxes = [];
    cart.total_tax = 0;
    cart.items.forEach((item) => {

      cart.sub_total += round(item.unit_price * item.quantity, 2);
    });
    cart.total = cart.sub_total - cart.discount_value;
    this.cart = cart;
    return this.cart;
  }

  addItem(product: Product, stock: Stock) {
    const index = this.cart.items.findIndex(item => item.product_id === product.id && item.stock_id == stock.id);
    if (index > -1) {
      this.cart.items[index].quantity += 1;
    } else {
      this.cart.items.push(CartService.createItem(product, stock));
    }
    return this.calcTotal();
  }

}

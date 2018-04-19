import {ItemTax} from './itemtax';
import {Stock} from './stock';

export interface Item {
  name: string;
  quantity: number;
  stock_id: number;
  product_id: number;
  discount: number;
  unit_price: number;
  stock_adjust: boolean;

  stock: Stock;
  taxes: ItemTax[];
}

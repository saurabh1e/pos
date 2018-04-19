import {Item} from './item';
import {Customer} from './customer';

export interface Order {
  id: number;
  sub_total: number;
  total: number;
  amount_paid: number;
  is_draft: boolean;
  invoice_number: number;
  reference_number: number;
  discount_value: number;
  created_on: Date;

  doctor: string;
  customer_id: number;
  user_id: number;
  address_id: number;
  store_id: number;
  current_status_id: number;

  items: Item[];
  taxes: any[];
  total_tax: number;

  customer: Customer;
  created_by: string;
  address: string;
  store: string;
  current_status: string;
  time_line: string;
}



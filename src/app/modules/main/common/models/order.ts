import {Item} from './item';

export interface Order {
  sub_total: number;
  total: number;
  amount_paid: number;

  invoice_number: number;
  reference_number: number;
  discount_value: number;

  customer_id: number;
  user_id: number;
  address_id: number;
  store_id: number;
  current_status_id: number;

  items: Item[];
  taxes: any[];
  total_tax: number;

  customer: string;
  created_by: string;
  address: string;
  store: string;
  current_status: string;
  time_line: string;
}



export interface Stock {
  id: number;
  purchase_amount: number;
  selling_amount: number;
  units_purchased: number;
  batch_number: number;
  expiry_date: Date;
  is_sold: boolean;
  default_stock: boolean;

  distributor_bill_id: number;
  product_id: number;
  store_id: number;

}

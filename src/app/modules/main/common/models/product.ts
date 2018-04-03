import {Brand} from './brand';
import {Stock} from './stock';

export interface Product {
  id: number;
  name: string;
  description: string;
  sub_description: string;
  is_disabled: boolean;
  prescription_required: boolean;
  therapeutic_name: string;
  is_loose: boolean;
  barcode: number;
  brand_id: number;
  tags: string;
  brand: Brand;
  stocks: Stock[];
  taxes: any[];
}

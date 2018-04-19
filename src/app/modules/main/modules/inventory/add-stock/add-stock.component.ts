import {Component, OnInit} from '@angular/core';
import {StockService} from '../../../common/services/stock.service';
import {MatDialogRef} from '@angular/material';
import {Stock} from '../../../common/models/stock';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss'],
  providers: [StockService]
})
export class AddStockComponent implements OnInit {

  stock: Stock = <Stock>{};
  productId: number;

  constructor(private _stock: StockService, private _dialog: MatDialogRef<AddStockComponent>) {
  }

  ngOnInit() {
  }

  addStock() {
    this.stock.product_id = this.productId;
    this._stock.create(this.stock, {__only: ['id']}).subscribe(res => {
      this.stock.id = res.data[0].id;
      this.close();
    });
  }

  close() {
    this._dialog.close(this.stock);
  }

}

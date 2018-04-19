import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InventoryRoutingModule} from './inventory-routing.module';
import {InventoryComponent} from './inventory.component';
import {AddStockComponent} from './add-stock/add-stock.component';

@NgModule({
  imports: [
    CommonModule,
    InventoryRoutingModule
  ],
  declarations: [InventoryComponent, AddStockComponent],
  entryComponents: [AddStockComponent],
  exports: [AddStockComponent]
})
export class InventoryModule {
}

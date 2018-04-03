import {NgModule} from '@angular/core';

import {BillingRoutingModule} from './billing-routing.module';
import {BillingComponent} from './billing.component';
import {CartComponent} from './components/cart/cart.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {SharedCommonModule} from '../../../../common/shared-common.module';
import {ProductSearchComponent} from './components/product-search/product-search.component';
import {AsyncLocalStorageModule} from 'angular-async-local-storage';
import {CartService} from './components/cart/cart-service';
import {CustomerInfoComponent} from './components/customer-info/customer-info.component';

@NgModule({
  imports: [
    SharedCommonModule,
    BillingRoutingModule,
    AsyncLocalStorageModule
  ],
  providers: [CartService],
  declarations: [BillingComponent, CartComponent, ProductListComponent, ProductDetailComponent, ProductSearchComponent, CustomerInfoComponent]
})
export class BillingModule {
}

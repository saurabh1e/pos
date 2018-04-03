import {NgModule} from '@angular/core';

import {MainRoutingModule} from './main-routing.module';
import {SharedCommonModule} from '../../common/shared-common.module';
import {StoreSelectComponent} from './common/components/store-select/store-select.component';
import {StoreService} from './common/services/store.service';
import {OrganisationService} from './common/services/organisation.service';
import {BillingModule} from './modules/billing/billing.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MainComponent} from './components/main/main.component';

@NgModule({
  imports: [
    SharedCommonModule,
    MainRoutingModule,
    BillingModule,
  ],
  providers: [StoreService, OrganisationService],
  declarations: [DashboardComponent, StoreSelectComponent, MainComponent]
})
export class MainModule {
}

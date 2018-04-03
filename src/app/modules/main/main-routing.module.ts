import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthGuard} from '../../common/services/auth-gaurd.service';
import {MainComponent} from './components/main/main.component';


const routes: Routes = [
  {
    path: '', component: MainComponent,
    canActivateChild: [AuthGuard],
    canActivate: [AuthGuard],
    children: [
      {path: '', component: DashboardComponent},
      {path: 'billing', loadChildren: './modules/billing/billing.module#BillingModule'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}

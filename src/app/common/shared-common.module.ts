import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  CovalentChipsModule, CovalentCommonModule, CovalentDataTableModule, CovalentDialogsModule, CovalentLayoutModule,
  CovalentLoadingModule, CovalentMediaModule, CovalentMenuModule, CovalentNotificationsModule, CovalentPagingModule, CovalentSearchModule,
  CovalentStepsModule, CovalentVirtualScrollModule
} from '@covalent/core';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatCommonModule, MatDatepickerModule,
  MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule,
  MatRadioModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSnackBarModule, MatTabsModule, MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {A11yModule} from '@angular/cdk/a11y';
import {BidiModule} from '@angular/cdk/bidi';
import {OverlayModule} from '@angular/cdk/overlay';
import {PlatformModule} from '@angular/cdk/platform';
import {ObserversModule} from '@angular/cdk/observers';
import {PortalModule} from '@angular/cdk/portal';
import {RouterModule} from '@angular/router';

const FLEX_LAYOUT_MODULES: any[] = [
  FlexLayoutModule,
];

const ANGULAR_MODULES: any[] = [
  FormsModule, ReactiveFormsModule, RouterModule
];

const MATERIAL_MODULES: any[] = [
  MatButtonModule, MatCardModule, MatIconModule, MatGridListModule,
  MatListModule, MatMenuModule, MatTooltipModule, MatCommonModule,
  MatSlideToggleModule, MatInputModule, MatCheckboxModule, MatExpansionModule,
  MatToolbarModule, MatSnackBarModule, MatSidenavModule, MatChipsModule, MatAutocompleteModule,
  MatTabsModule, MatSelectModule, MatDialogModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule
];

const CDK_MODULES: any[] = [
  CdkTableModule,
  A11yModule,
  BidiModule,
  ObserversModule,
  OverlayModule,
  PlatformModule,
  PortalModule,
];

const COVALENT_MODULES: any[] = [
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule, CovalentChipsModule, CovalentVirtualScrollModule
];

@NgModule({
  imports: [
    CommonModule,
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES,
    CDK_MODULES,
    FLEX_LAYOUT_MODULES,
  ],
  declarations: [],
  exports: [
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    CDK_MODULES,
    COVALENT_MODULES,
    FLEX_LAYOUT_MODULES,
  ]
})
export class SharedCommonModule {
}

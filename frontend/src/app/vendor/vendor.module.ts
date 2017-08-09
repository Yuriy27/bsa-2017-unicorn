import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SuiModule} from 'ng2-semantic-ui';

import { VendorsComponent } from './vendors/vendors.component';
import { VendorDetailsComponent } from './vendor-details/vendor-details.component';
import { VendorProfileInfoComponent } from './vendor-profile-info/vendor-profile-info.component';
import { VendorProfileContactsComponent } from './vendor-profile-contacts/vendor-profile-contacts.component';
import { VendorProfileReviewsComponent } from './vendor-profile-reviews/vendor-profile-reviews.component';
import { VendorProfilePortfolioComponent } from './vendor-profile-portfolio/vendor-profile-portfolio.component';

import { VendorRoutingModule } from './vendor-routing.module';

import { VendorService } from '../services/vendor.service';
import { DataService } from "../services/data.service";

@NgModule({
  imports: [
    CommonModule,
    VendorRoutingModule,
    SuiModule
  ],
  declarations: [
    VendorDetailsComponent,
    VendorProfileInfoComponent,
    VendorProfileContactsComponent,
    VendorProfileReviewsComponent,
    VendorProfilePortfolioComponent,
    VendorsComponent
  ],
  providers: [
    DataService,
    VendorService
  ]
})
export class VendorModule { }

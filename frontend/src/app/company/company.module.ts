import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import {SuiModule} from 'ng2-semantic-ui';

import { CompanyComponent } from './company-component/company.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanyRoutingModule } from './company-routing.module';
import { GeneralInformationComponent } from './company-details/general-information/general-information.component';
import { ReviewsComponent } from './company-details/reviews/reviews.component';
import { VendorsComponent } from './company-details/vendors/vendors.component';
import { ContactsComponent } from './company-details/contacts/contacts.component';
import { Company } from "../models/company";
import { Review } from "../models/review";
import { Vendor } from "../models/vendor";

@NgModule({
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    BrowserModule,
    SuiModule
  ],
  declarations: [
    CompanyComponent,
    CompanyDetailsComponent,
    GeneralInformationComponent,
    ReviewsComponent,
    VendorsComponent,
    ContactsComponent
  ],
  providers: [Company, Review, Vendor]
})
export class CompanyModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuiModule } from 'ng2-semantic-ui';
import { SearchComponent } from './search-component/search.component';

import { SearchRoutingModule } from './search-routing.module';

import { Review } from '../models/review.model';
import { environment } from '../../environments/environment';
import { NguiMapModule } from '@ngui/map';
import { CompanyService } from "../services/company-services/company.service";
// import { MapComponent } from '../map/map.component';


@NgModule({
  imports: [
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=' + environment.googleMapsKey}),
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    SuiModule
  ],
  declarations: [
    SearchComponent,
    // MapComponent
  ],
  providers: [
    CompanyService
  ]
})
export class SearchModule { }
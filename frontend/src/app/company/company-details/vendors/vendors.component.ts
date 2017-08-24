import { Component, OnInit } from '@angular/core';
import { CompanyVendors } from "../../../models/company-page/company-vendors.model";
import { CompanyService } from "../../../services/company-services/company.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'company-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.sass']
})
export class VendorsComponent implements OnInit {

  company: CompanyVendors;
  isVendorsEmpty: boolean = true;

constructor(private companyService: CompanyService,
  private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.companyService.getCompanyVendors(params['id']))
    .subscribe(res => {      
      this.company = res;
      // if(this.company.Vendors.Result  !== undefined){
      //   this.company.Vendors.Result.forEach(element => {
          if(this.company  !== undefined){
            this.company.Vendors.forEach(element => {
          if(element.Avatar == "default"){
            element.Avatar = "https://image.flaticon.com/icons/png/512/78/78373.png";
          }      
        });           
      }            
    });  
    
  }

}
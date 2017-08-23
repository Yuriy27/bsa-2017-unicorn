import { Component, OnInit } from '@angular/core';
import { Review } from "../../models/review.model";
import { JwtHelper } from '../../helpers/jwthelper';
import { ActivatedRoute, Params } from "@angular/router";
import { CompanyShort } from "../../models/company-page/company-short.model";
import { CompanyService } from "../../services/company-services/company.service";

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.sass']
})
export class CompanyDetailsComponent implements OnInit {
  company: CompanyShort;  
  isGuest: boolean;  

  tabActive: boolean = false;

  routePath: string;
  routeid: number;

  constructor(private companyService: CompanyService,
    private route: ActivatedRoute) {
    this.routePath = this.route.root.snapshot.firstChild.url[0].path;
    this.routeid = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.companyService.getCompanyShort(params['id']))
    .subscribe(res => {
      this.company = res;
    });   
    if (this.route.snapshot.queryParams['tab'] === 'reviews') {
      this.tabActive = true;
    }
    console.log(this.route.snapshot.queryParams['tab']);   

    this.getCurrentRole();
  }
  getCurrentRole() {
    let token = localStorage.getItem('token');
    if (token === null) {
      this.isGuest = true;
      return;
    }
    const userClaims = new JwtHelper().decodeToken(token);
    if (userClaims['roleid'] != 1)
      this.isGuest = false; else
      this.isGuest = true;
  }
}


import { Component, OnInit, Input } from '@angular/core';

import * as firebase from 'firebase/app';
import { RegisterService } from '../../services/register.service';

// Helpers
import { JwtHelper } from '../../helpers/jwthelper';
import { RoleRouter } from '../../helpers/rolerouter';

import { SuiModalService, TemplateModalConfig
  , ModalTemplate, ModalSize, SuiActiveModal } from 'ng2-semantic-ui';
import { Company } from '../models/company';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {

  @Input() social: firebase.User;

  @Input() public modal: SuiActiveModal<{}, {}, string>;

  name: string;
  mode: string;
  error: boolean = false;
  phone: string;
  description: string;
  staff: number;
  email: string;
  foundation: any;

  constructor(private registerService: RegisterService,
    private router: Router) { }

  ngOnInit() {
    this.mode = 'date';
  }

  valid(): boolean {
    return this.foundation !== undefined && this.staff != undefined && this.phone != undefined
      && this.description !== undefined;
  }

  aggregateInfo(): Company {
    let info = new Company();
    info.foundation = this.foundation;
    info.staff = this.staff;
    info.description = this.description;
    info.phone = this.phone;
    info.email = this.email;
    info.image = this.social.photoURL;
    info.name = this.name;
    info.provider = this.social.providerData[0].providerId;
    info.uid = this.social.uid;

    return info;
  }

  confirmRegister() {
    if (this.valid()) {
      this.error = false;      
      let regInfo = this.aggregateInfo();      
      this.registerService.confirmCompany(regInfo).then(resp => {
        this.modal.deny('');
        localStorage.setItem('token', resp.headers.get('token'));        
        this.redirect();
      });
    } else {
      this.error = true;
    }
  }

  private redirect() {   
    const userClaims = new JwtHelper().decodeToken(localStorage.getItem('token'));
    let path = new RoleRouter().getRouteByRole(userClaims['roleid']);
    this.router.navigate([path, userClaims['id']]);
  }

}

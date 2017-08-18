import { Component, OnInit, Input } from '@angular/core';

import * as firebase from 'firebase/app';
import { RegisterService } from '../../services/register.service';
import { HelperService } from '../../services/helper/helper.service';
import { AuthenticationEventService } from '../../services/events/authenticationevent.service';

import {
  SuiModalService, TemplateModalConfig
  , ModalTemplate, ModalSize, SuiActiveModal
} from 'ng2-semantic-ui';
import { Vendor } from '../models/vendor';

@Component({
  selector: 'app-register-vendor',
  templateUrl: './register-vendor.component.html',
  styleUrls: ['./register-vendor.component.css']
})
export class RegisterVendorComponent implements OnInit {

  @Input() social: firebase.User;

  @Input() public modal: SuiActiveModal<{}, {}, string>;

  experience: number;
  position: string;
  speciality: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;

  mode: string;

  error: boolean = false;

  phone: string;
  birthday;

  constructor(private registerService: RegisterService,
    private helperService: HelperService,
    private authEventService: AuthenticationEventService) { }

  ngOnInit() {
    this.mode = 'date';
  }

  valid(): boolean {
    return this.birthday !== undefined && this.phone != undefined
      && this.experience !== undefined && this.position !== undefined
      && this.speciality !== undefined;
  }

  aggregateInfo(): Vendor {
    let info = new Vendor();
    info.birthday = this.birthday;
    info.phone = this.phone;

    info.email = this.email;
    info.image = this.social.photoURL;
    info.firstName = this.firstName;
    info.middleName = this.middleName;
    info.lastName = this.lastName;
    info.provider = this.social.providerData[0].providerId;
    info.uid = this.social.uid;

    info.experience = this.experience;
    info.position = this.position;
    info.speciality = this.speciality;

    return info;
  }

  confirmRegister() {
    if (this.valid()) {
      this.error = false;
      let regInfo = this.aggregateInfo();
      this.registerService.confirmVendor(regInfo).then(resp => {
        this.modal.deny('');
        localStorage.setItem('token', resp.headers.get('token'));
        this.authEventService.signIn();
        this.helperService.redirectAfterAuthentication();
      });
    } else {
      this.error = true;
    }
  }
}

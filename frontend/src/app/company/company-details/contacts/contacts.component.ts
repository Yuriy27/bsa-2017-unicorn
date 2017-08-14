import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NguiMapModule, Marker } from "@ngui/map";
import { MapModel } from "../../../models/map.model";


export interface IContext {
    data:string;
}

@Component({
  selector: 'company-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass']
})
export class ContactsComponent implements OnInit {      
  map: MapModel= {
    center: {lat: 49.85711, lng: 24.01980},
    zoom: 18,    
    title: "Overcat 9000",
    label: "Overcat 9000",
    markerPos: {lat: 49.85711, lng: 24.01980}
    
    
  } ;

  constructor() { }

  ngOnInit() {    
  }   
}

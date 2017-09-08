import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { UtilsModule } from "./utils/utils.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule.forRoot(),
    UtilsModule
  ],
  declarations: [CalendarComponent], 
  exports: [CalendarComponent]
})
export class OwnCalendarModule { }

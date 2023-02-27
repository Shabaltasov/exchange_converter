import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterComponent } from './converter.component';
import {InputModule} from "../input/input.module";
import {GetControlModule} from "../../pipes/get-control/get-control.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ConverterComponent
  ],
  exports: [
    ConverterComponent
  ],
    imports: [
        CommonModule,
        InputModule,
        GetControlModule,
        ReactiveFormsModule
    ]
})
export class ConverterModule { }

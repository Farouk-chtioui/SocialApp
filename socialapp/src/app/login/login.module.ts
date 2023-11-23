import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,LoginComponent
  ],
  exports: [LoginComponent]
})
export class LoginModule { }

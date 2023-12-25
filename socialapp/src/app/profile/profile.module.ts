import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { UserprofileModule } from '../userprofile/userprofile.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,ProfileComponent, UserprofileModule
  ],
  exports: [ProfileComponent]
})
export class ProfileModule { }

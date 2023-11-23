import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './groups/groups.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,GroupComponent
  ],
  exports: [GroupComponent]
})
export class GroupsModule { }

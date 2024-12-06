import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembersPageRoutingModule } from './members-routing.module';

import { AddMemberComponent } from './add-member/add-member.component';
import { MembersPage } from './members.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MembersPageRoutingModule,
  ],
  declarations: [MembersPage, AddMemberComponent],
})
export class MembersPageModule {}

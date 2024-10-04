import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembrosPageRoutingModule } from './membros-routing.module';

import { MembrosPage } from './membros.page';
import { AddMemberComponent } from './add-member/add-member.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MembrosPageRoutingModule
  ],
  declarations: [MembrosPage, AddMemberComponent]
})
export class MembrosPageModule {}

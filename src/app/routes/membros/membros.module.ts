import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembrosPageRoutingModule } from './membros-routing.module';

import { MembrosPage } from './membros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MembrosPageRoutingModule
  ],
  declarations: [MembrosPage]
})
export class MembrosPageModule {}

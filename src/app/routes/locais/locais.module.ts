import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocaisPageRoutingModule } from './locais-routing.module';

import { LocaisPage } from './locais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocaisPageRoutingModule
  ],
  declarations: [LocaisPage]
})
export class LocaisPageModule {}

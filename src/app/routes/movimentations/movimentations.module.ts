import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovimentationsPageRoutingModule } from './movimentations-routing.module';

import { MovimentationsPage } from './movimentations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovimentationsPageRoutingModule
  ],
  declarations: [MovimentationsPage]
})
export class MovimentationsPageModule {}

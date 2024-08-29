import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WarehousesPageRoutingModule } from './warehouses-routing.module';

import { WarehousesPage } from './warehouses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WarehousesPageRoutingModule
  ],
  declarations: [WarehousesPage]
})
export class WarehousesPageModule {}

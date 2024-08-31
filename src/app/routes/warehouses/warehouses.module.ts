import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WarehousesPageRoutingModule } from './warehouses-routing.module';

import { WarehousesPage } from './warehouses.page';
import { CreateWarehouseComponent } from './create-warehouse/create-warehouse.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WarehousesPageRoutingModule
  ],
  declarations: [WarehousesPage, CreateWarehouseComponent]
})
export class WarehousesPageModule {}

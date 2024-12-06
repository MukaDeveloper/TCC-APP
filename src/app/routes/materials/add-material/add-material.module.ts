import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMaterialPageRoutingModule } from './add-material-routing.module';

import { AddMaterialPage } from './add-material.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AddMaterialPageRoutingModule
  ],
  declarations: [AddMaterialPage]
})
export class AddMaterialPageModule {}

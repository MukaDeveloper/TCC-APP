import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialsPageRoutingModule } from './materials-routing.module';

import { MaterialsPage } from './materials.page';
import { AddMaterialComponent } from './add-material/add-material.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialsPageRoutingModule
  ],
  declarations: [MaterialsPage, AddMaterialComponent]
})
export class MaterialsPageModule {}

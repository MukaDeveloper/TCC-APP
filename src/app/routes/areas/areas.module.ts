import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreasPageRoutingModule } from './areas-routing.module';

import { AreasPage } from './areas.page';
import { SharedModule } from '../../../shared/shared.module';
import { NewAreaComponent } from './new-area/new-area.component';
import { EditAreaComponent } from './edit-area/edit-area.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AreasPageRoutingModule
  ],
  declarations: [AreasPage, NewAreaComponent, EditAreaComponent]
})
export class AreasPageModule {}

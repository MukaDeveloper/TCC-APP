import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { LayoutPage } from './layout.page';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [SharedModule, CommonModule, FormsModule, IonicModule],
  declarations: [LayoutPage, HeaderComponent, SidebarComponent],
})
export class LayoutPageModule {}

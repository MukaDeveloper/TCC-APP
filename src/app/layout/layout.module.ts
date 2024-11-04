import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { LayoutPage } from './layout.page';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserblockComponent } from './sidebar/userblock/userblock.component';
import { ModalCartModule } from '../routes/components/modal-cart/modal-cart.module';

@NgModule({
  imports: [SharedModule, CommonModule, FormsModule, IonicModule, ModalCartModule],
  declarations: [
    LayoutPage,
    HeaderComponent,
    SidebarComponent,
    UserblockComponent,
  ],
})
export class LayoutPageModule {}

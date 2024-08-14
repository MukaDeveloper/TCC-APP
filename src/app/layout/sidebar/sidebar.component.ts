import { Component, OnInit } from '@angular/core';
import { sidebarMenu } from './sidebar-menus';
import { SidebarService } from 'src/services/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent  implements OnInit {

  public isLoading = true;

  constructor(
  ) {
  }

  ngOnInit() {
    this.isLoading = false;
  }

}

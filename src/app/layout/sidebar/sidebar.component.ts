import { alertController } from '@ionic/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent  implements OnInit {

  public isLoading = true;

  constructor() { }

  ngOnInit() {
    this.isLoading = false;
  }

}

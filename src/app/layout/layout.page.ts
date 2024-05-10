import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit {

  public isLoading = true;

  constructor() { }

  ngOnInit() {
    this.isLoading = false;
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locais',
  templateUrl: './locais.page.html',
  styleUrls: ['./locais.page.scss'],
})
export class LocaisPage implements OnInit {

  // TODO: Fazer interface de Locais e métodos
  public locaisList: any[] = [];

  constructor() { }

  ngOnInit() {
    this.getAll();
  }

  public getAll(): void {

  }

  public onAdd(): void {

  }

  public onReload(): void {

  }

}

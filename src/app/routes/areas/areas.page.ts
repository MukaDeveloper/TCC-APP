import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/utils/base.component';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { AreasService } from 'src/services/areas/areas.service';
import { IArea } from 'src/services/areas/interfaces/i-area';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.page.html',
  styleUrls: ['./areas.page.scss'],
})
export class AreasPage extends BaseComponent implements OnInit {
  public isLoading = true;
  public areas: IArea[] | null = [];

  constructor(
    private readonly areasService: AreasService,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  ngOnInit() {
    this.subs.push(
      this.areasService.areas$.subscribe((res) => {
        this.areas = res;
      })
    );

    this.isLoading = false;
  }

  public selectArea(area: any) {

  }

  public editArea(area: any) {

  }

  public deleteArea(area: any) {

  }

  public onReload() {
    this.isLoading = true;
    this.areasService
      .getAll()
      .subscribe({
        next: (res) => {
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
  }
}

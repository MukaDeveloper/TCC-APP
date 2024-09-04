import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/utils/base.component';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { AreasService } from 'src/services/areas/areas.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.page.html',
  styleUrls: ['./areas.page.scss'],
})
export class AreasPage extends BaseComponent implements OnInit {
  public isLoading = true;
  public areas: any[] | null = [];

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
        console.log(res);
        this.areas = res;
      })
    );

    this.isLoading = false;
  }
}

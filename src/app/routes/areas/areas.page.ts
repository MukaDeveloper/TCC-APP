import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/utils/base.component';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.page.html',
  styleUrls: ['./areas.page.scss'],
})
export class AreasPage extends BaseComponent implements OnInit {

  constructor(
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) { 
    super(toastController, alertController, loadingController);
  }

  ngOnInit() {
    
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, AlertController, LoadingController, IonModal } from '@ionic/angular';
import { ISolicitation } from 'src/services/solicitations/interfaces/i-solicitation';
import { BaseComponent } from 'src/shared/utils/base.component';

@Component({
  selector: 'app-view-solicitation',
  templateUrl: './view-solicitation.component.html',
  styleUrls: ['./view-solicitation.component.scss'],
})
export class ViewSolicitationComponent extends BaseComponent implements OnInit {

  public solicitation: ISolicitation | null = null;
  @ViewChild(IonModal) public modal!: IonModal;

  constructor(
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  ngOnInit() {}

  public onOpenModal(solicitation: ISolicitation) {
    this.solicitation = solicitation;
    this.modal.present();
  }
}

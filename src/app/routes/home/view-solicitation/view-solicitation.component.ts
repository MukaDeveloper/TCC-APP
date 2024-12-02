import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ToastController,
  AlertController,
  LoadingController,
  IonModal,
} from '@ionic/angular';
import { IPayload } from 'src/services/payload/interfaces/i-payload';
import { PayloadService } from 'src/services/payload/payload.service';
import { ESolicitationStatus } from 'src/services/solicitations/interfaces/enum/solicitation-status.enum';
import { ISolicitation } from 'src/services/solicitations/interfaces/i-solicitation';
import { BaseComponent } from 'src/shared/utils/base.component';

@Component({
  selector: 'app-view-solicitation',
  templateUrl: './view-solicitation.component.html',
  styleUrls: ['./view-solicitation.component.scss'],
})
export class ViewSolicitationComponent extends BaseComponent implements OnInit {
  @ViewChild(IonModal) public modal!: IonModal;
  public solicitation: ISolicitation | null = null;
  public payload: IPayload | null = null;
  public eSolWaiting = ESolicitationStatus.WAITING;

  constructor(
    private readonly payloadService: PayloadService,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  ngOnInit() {
    this.subs.push(
      this.payloadService.payload$.subscribe((res) => (this.payload = res))
    );
  }

  public onOpenModal(solicitation: ISolicitation) {
    this.solicitation = solicitation;
    this.modal.present();
    console.log(this.solicitation?.status, this.eSolWaiting);
  }

  public onApprove() {}

  public onDecline() {}
}

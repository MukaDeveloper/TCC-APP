import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {
  ToastController,
  AlertController,
  LoadingController,
  IonModal,
} from '@ionic/angular';
import { IPayload } from 'src/services/payload/interfaces/i-payload';
import { PayloadService } from 'src/services/payload/payload.service';
import { UpdateSolicitationDto } from 'src/services/solicitations/dto/update-solicitation.dto';
import { ESolicitationStatus } from 'src/services/solicitations/interfaces/enum/solicitation-status.enum';
import { ISolicitation } from 'src/services/solicitations/interfaces/i-solicitation';
import { SolicitationsService } from 'src/services/solicitations/solicitations.service';
import { BaseComponent } from 'src/shared/utils/base.component';

@Component({
  selector: 'app-view-solicitation',
  templateUrl: './view-solicitation.component.html',
  styleUrls: ['./view-solicitation.component.scss'],
})
export class ViewSolicitationComponent extends BaseComponent implements OnInit {
  @ViewChild(IonModal) public modal!: IonModal;
  @Output() public updated: EventEmitter<boolean> = new EventEmitter<boolean>();
  public solicitation: ISolicitation | null = null;
  public payload: IPayload | null = null;
  public eSolWaiting = ESolicitationStatus.WAITING;
  public isLoading = false;

  constructor(
    private readonly payloadService: PayloadService,
    private readonly solicitationsService: SolicitationsService,
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

  public onApprove() {
    this.isLoading = true;

    const obj: UpdateSolicitationDto = {
      id: this.solicitation?.id as number,
      status: ESolicitationStatus.ACCEPT,
      movimentedAt: new Date().toISOString(),
    }

    this.solicitationsService.update(obj).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this.toast(`A Solicitação #${res?.item?.id} foi aprovada com sucesso`, "Sucesso!", 'success');
        this.updated.emit();
        this.modal.dismiss();
      },
      error: (error) => {
        console.error(error);
        this.alert(error?.message, "Atenção!");
        this.isLoading = false;
      }
    })
  }

  public onDecline() {}
}

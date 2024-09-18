import { PayloadService } from './../../../../services/payload/payload.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  ToastController,
  AlertController,
  LoadingController,
  IonModal,
} from '@ionic/angular';
import { IPayload } from 'src/services/payload/interfaces/i-payload';
import { BaseComponent } from 'src/shared/utils/base.component';

@Component({
  selector: 'app-edit-area',
  templateUrl: './edit-area.component.html',
  styleUrls: ['./edit-area.component.scss'],
})
export class EditAreaComponent extends BaseComponent implements OnInit {

  @ViewChild(IonModal) public modal!: IonModal;
  public isLoading: boolean = false;
  public formGroup: FormGroup | null = null;
  public payload: IPayload | null = null;

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
      this.payloadService.payload$.subscribe((res) => this.payload = res),
    )
  }

  public onOpenModal() {
    this.createForm();
    this.modal.present();
  }

  public onSubmit() {}

  private createForm() {}
}

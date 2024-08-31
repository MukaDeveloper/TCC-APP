import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../shared/utils/base.component';
import { PayloadService } from '../../../../services/payload/payload.service';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { IPayload } from '../../../../services/payload/interfaces/i-payload';

@Component({
  selector: 'app-userblock',
  templateUrl: './userblock.component.html',
  styleUrls: ['./userblock.component.scss'],
})
export class UserblockComponent extends BaseComponent  implements OnInit {

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
      this.payloadService.payload$.subscribe((res) => (this.payload = res)),
    );
  }

  public getPayloadImage(): string {
    return this.payload?.photoUrl || 'assets/imgs/user-dummy.png';
  }

  public onImgError(event: any) {
    event.target.src = 'assets/imgs/user-dummy.png';
  }

}

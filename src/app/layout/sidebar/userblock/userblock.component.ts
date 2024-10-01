import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { IInstitution } from 'src/services/instution/interfaces/i-institution';
import { InstitutionService } from '../../../../services/instution/intitution.service';
import { IPayload } from '../../../../services/payload/interfaces/i-payload';
import { PayloadService } from '../../../../services/payload/payload.service';
import { ResetService } from '../../../../services/reset/reset.service';
import { BaseComponent } from '../../../../shared/utils/base.component';

@Component({
  selector: 'app-userblock',
  templateUrl: './userblock.component.html',
  styleUrls: ['./userblock.component.scss'],
})
export class UserblockComponent extends BaseComponent implements OnInit {
  // #region Properties (2)

  public institution: IInstitution | null = null;
  public payload: IPayload | null = null;

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor(
    private readonly resetService: ResetService,
    private readonly payloadService: PayloadService,
    private readonly institutionService: InstitutionService,
    private router: Router,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  // #endregion Constructors (1)

  // #region Public Methods (3)

  public getPayloadImage(): string {
    return this.payload?.photoUrl || 'assets/imgs/user-dummy.png';
  }

  public ngOnInit() {
    this.subs.push(
      this.payloadService.payload$.subscribe((res) => (this.payload = res)),
      this.institutionService.institution$.subscribe(
        (res) => (this.institution = res)
      )
    );
  }

  public onImgError(event: any) {
    event.target.src = 'assets/imgs/user-dummy.png';
  }

  // #endregion Public Methods (3)
}

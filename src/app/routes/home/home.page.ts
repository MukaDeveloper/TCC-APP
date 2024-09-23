import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
  ViewDidEnter,
} from '@ionic/angular';
import { IInstitution } from 'src/services/instution/interfaces/i-institution';
import { IWarehouse } from 'src/services/warehouses/interfaces/i-warehouse';
import { WarehousesService } from 'src/services/warehouses/warehouses.service';
import { BaseComponent } from 'src/shared/utils/base.component';
import { InstitutionService } from '../../../services/instution/intitution.service';
import { EMovimentationType } from '../../../services/movimentations/interfaces/enum/EMovimentationType';
import { IMovimentations } from '../../../services/movimentations/interfaces/i-movimentations';
import { MovimentationsService } from '../../../services/movimentations/movimentations.service';
import { IPayload } from '../../../services/payload/interfaces/i-payload';
import { PayloadService } from '../../../services/payload/payload.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends BaseComponent implements OnInit {
  // #region Properties (4)

  public institution: IInstitution | null = null;
  public isLoading = true;
  public payload: IPayload | null = null;
  public warehouses: IWarehouse[] | null = [];

  // #endregion Properties (4)

  // #region Constructors (1)

  constructor(
    private readonly payloadService: PayloadService,
    private readonly institutionService: InstitutionService,
    private readonly warehousesService: WarehousesService,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public ngOnInit() {
    this.subs.push(
      this.payloadService.payload$.subscribe((res) => (this.payload = res)),
      this.warehousesService.warehouses$.subscribe(
        (res) => (this.warehouses = res)
      ),
      this.institutionService.institution$.subscribe(
        (res) => (this.institution = res)
      )
    );
  }

  // #endregion Public Methods (1)
}

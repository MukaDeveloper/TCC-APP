import { Component, effect, OnInit } from '@angular/core';
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
import { EMovimentationEvent } from '../../../services/movimentations/interfaces/enum/movimentation-role.enum';
import { IMovimentations } from '../../../services/movimentations/interfaces/i-movimentations';
import { MovimentationsService } from '../../../services/movimentations/movimentations.service';
import { IPayload } from '../../../services/payload/interfaces/i-payload';
import { PayloadService } from '../../../services/payload/payload.service';
import { CartService } from 'src/services/cart/cart.service';
import { ICart } from 'src/services/cart/interfaces/i-cart';
import { Router } from '@angular/router';
import { ERouters } from 'src/shared/utils/e-routers';

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
  public solicitations: any[] = [];

  // #endregion Properties (4)

  // #region Constructors (1)

  constructor(
    private readonly payloadService: PayloadService,
    private readonly institutionService: InstitutionService,
    private readonly warehousesService: WarehousesService,
    private router: Router,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);

    effect(() => {
      // Aqui receber as atualizações de solicitations
    })
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
    this.isLoading = false;
  }

  public GoToMaterials() {
    this.router.navigate([`${ERouters.app}/${ERouters.materials}`]);
  }

  // #endregion Public Methods (1)
}

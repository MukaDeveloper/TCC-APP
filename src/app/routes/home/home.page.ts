import { ChangeDetectorRef, Component, effect, OnInit, ViewChild } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { IInstitution } from 'src/services/instution/interfaces/i-institution';
import { IWarehouse } from 'src/services/warehouses/interfaces/i-warehouse';
import { WarehousesService } from 'src/services/warehouses/warehouses.service';
import { BaseComponent } from 'src/shared/utils/base.component';
import { InstitutionService } from '../../../services/instution/intitution.service';
import { IPayload } from '../../../services/payload/interfaces/i-payload';
import { PayloadService } from '../../../services/payload/payload.service';
import { Router } from '@angular/router';
import { ERouters } from 'src/shared/utils/e-routers';
import { SolicitationsService } from 'src/services/solicitations/solicitations.service';
import { ESolicitationStatus } from 'src/services/solicitations/interfaces/enum/solicitation-status.enum';
import { TranslateService } from '@ngx-translate/core';
import { ISolicitation } from 'src/services/solicitations/interfaces/i-solicitation';

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
  public warehouses: IWarehouse[] = [];
  public solicitations: ISolicitation[] = [];
  public loadingSwiper = true;

  // #endregion Properties (4)

  // #region Constructors (1)

  constructor(
    private readonly solicitationsService: SolicitationsService,
    private readonly payloadService: PayloadService,
    private readonly institutionService: InstitutionService,
    private readonly warehousesService: WarehousesService,
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
    this.translateService.addLangs(['en', 'pt-BR']);
    this.translateService.setDefaultLang('pt-BR');
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(
      browserLang?.match(/en|pt-BR/) ? browserLang : 'pt-BR'
    );

    effect(() => {
      // Aqui receber as atualizações de solicitations
      const solicitations = this.solicitationsService.solicitations;
      if (solicitations != this.solicitations) {
        this.loadingSwiper = true;
        console.log(
          'Atualizando solicitações',
          this.solicitationsService.solicitations
        );
        setTimeout(() => {
          this.solicitations = this.solicitationsService.solicitations;
          this.cdr.detectChanges();
          this.loadingSwiper = false;
        }, 1500);
      }
      this.isLoading = false;
    });
  }

  // #endregion Constructors (1)

  public get slideSize(): number {
    if (window.innerWidth <= 950 && window.innerWidth > 798) {
      return 2.5;
    }
    if (window.innerWidth <= 798) {
      return 1.5;
    }
    return 3.5;
  }

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

  public onReload() {
    this.isLoading = true;
    this.solicitationsService.get().subscribe({
      next: (_) => {
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    })
  }

  public GoToMaterials() {
    this.router.navigate([`${ERouters.app}/${ERouters.materials}`]);
  }

  public resolveStatusColor(status: ESolicitationStatus): string {
    switch (status) {
      case ESolicitationStatus.WAITING:
        return 'warning';
      case ESolicitationStatus.ACCEPT:
        return 'success';
      case ESolicitationStatus.DECLINED:
        return 'danger';
      case ESolicitationStatus.WITHDRAWN:
        return 'tertiary';
      case ESolicitationStatus.RETURNED:
        return 'success';
    }
  }

  // #endregion Public Methods (1)
}

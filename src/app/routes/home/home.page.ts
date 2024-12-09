import { ChangeDetectorRef, Component, effect, OnInit } from '@angular/core';
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
export class HomePage extends BaseComponent implements OnInit, ViewDidEnter {
  // #region Properties (4)

  public institution: IInstitution | null = null;
  public isLoading = true;
  public payload: IPayload | null = null;
  public warehouses: IWarehouse[] = [];
  public solicitations: ISolicitation[] = [];
  public loadingSwiper = true;
  public statusOrder: Record<ESolicitationStatus, number> = {
    [ESolicitationStatus.WAITING]: 0,
    [ESolicitationStatus.ACCEPT]: 1,
    [ESolicitationStatus.DECLINED]: 2,
    [ESolicitationStatus.WITHDRAWN]: 3,
    [ESolicitationStatus.RETURNED]: 4,
  };

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
      if (solicitations) {
        this.onReloadSwiper(solicitations);
      }
    });
  }
  ionViewDidEnter(): void {
    if (this.solicitations) {
      this.onReloadSwiper(this.solicitations);
      return;
    }

    
  }

  // #endregion Constructors (1)

  public get slideSize() {
    let slidesPerView = '3.5';
    if (window.innerWidth <= 950 && window.innerWidth > 798) {
      slidesPerView = '2.5';
    }
    if (window.innerWidth <= 798) {
      slidesPerView = '1.5';
    }
    return slidesPerView;
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
    this.onGetColls();
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

  private onGetColls() {
    this.solicitationsService.get().subscribe({
      next: (res) => {
        this.onReloadSwiper(res.items);
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      },
    });
  }

  private onReloadSwiper(newValue: ISolicitation[]) {
    this.loadingSwiper = true;
    this.isLoading = false;
    this.solicitations = this.reorderSolicitations(newValue);
    setTimeout(() => {
      this.loadingSwiper = false;
      this.cdr.detectChanges();
    }, 1500);
  }

  private reorderSolicitations(
    solicitations: ISolicitation[]
  ): ISolicitation[] {
    const dateFilter = solicitations.sort(
      (a, b) =>
        new Date(a.solicitedAt).getTime() - new Date(b.solicitedAt).getTime()
    );
    return dateFilter.sort(
      (a, b) => this.statusOrder[a.status] - this.statusOrder[b.status]
    );
  }

  // #endregion Public Methods (1)
}

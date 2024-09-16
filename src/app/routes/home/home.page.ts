import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
  ViewDidEnter,
} from '@ionic/angular';
import { WarehousesService } from 'src/services/warehouses/warehouses.service';
import { BaseComponent } from 'src/shared/utils/base.component';
import { InstitutionService } from '../../../services/instution/intitution.service';
import { IPayload } from '../../../services/payload/interfaces/i-payload';
import { PayloadService } from '../../../services/payload/payload.service';
import { IWarehouse } from 'src/services/warehouses/interfaces/i-warehouse';
import { IInstitution } from 'src/services/instution/interfaces/i-institution';
import { MovimentationsService } from '../../../services/movimentations/warehouses.service';
import { IMovimentations } from '../../../services/movimentations/interfaces/i-movimentations';
import { EMovimentationType } from '../../../services/movimentations/interfaces/enum/EMovimentationType';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends BaseComponent implements OnInit, ViewDidEnter {
  // #region Properties (6)

  public institution: IInstitution | null = null;
  public isLoading = true;
  public movimentations: IMovimentations[] | null = [];
  public movimentationsFilter: IMovimentations[] | null = [];
  public payload: IPayload | null = null;
  public warehouses: IWarehouse[] | null = [];

  // #endregion Properties (6)

  // #region Constructors (1)

  constructor(
    private readonly payloadService: PayloadService,
    private readonly institutionService: InstitutionService,
    private readonly movimentationsService: MovimentationsService,
    private readonly warehousesService: WarehousesService,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  // #endregion Constructors (1)

  // #region Public Getters And Setters (2)

  public get filteredEntries(): IMovimentations[] | undefined | null {
    return this.movimentationsFilter
      ?.filter((mov) => mov.type === EMovimentationType.ENTRY)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  public get filteredExits(): IMovimentations[] | undefined | null {
    return this.movimentationsFilter
      ?.filter((mov) => mov.type === EMovimentationType.EXIT)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  // #endregion Public Getters And Setters (2)

  // #region Public Methods (2)

  ionViewDidEnter(): void {
    if (!this.movimentationsFilter?.length) {
      this.getAll();
    }
  }

  public ngOnInit() {
    this.subs.push(
      this.payloadService.payload$.subscribe((res) => (this.payload = res)),
      this.warehousesService.warehouses$.subscribe(
        (res) => (this.warehouses = res)
      ),
      this.movimentationsService.movimentations$.subscribe(
        (res) => (this.movimentations = res)
      ),
      this.movimentationsService.movimentationsFiltered$.subscribe(
        (res) => (this.movimentationsFilter = res)
      ),
      this.institutionService.institution$.subscribe(
        (res) => (this.institution = res)
      )
    );
  }

  public onReload() {
    this.getAll();
  }

  // #endregion Public Methods (2)

  // #region Private Methods (1)

  private getAll() {
    this.isLoading = true;
    this.movimentationsService.getAll().subscribe({
      next: (res) => {
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.alert("Erro ao carregar movimentações.", "Atenção!");
        this.isLoading = false;
      },
    });
  }

  // #endregion Private Methods (1)
}

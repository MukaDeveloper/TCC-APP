import { Component, OnInit, Renderer2 } from '@angular/core';
import { BaseComponent } from '../../../shared/utils/base.component';
import {
  ToastController,
  AlertController,
  LoadingController,
  ViewDidEnter,
} from '@ionic/angular';
import { EMovimentationType } from '../../../services/movimentations/interfaces/enum/EMovimentationType';
import { IMovimentations } from '../../../services/movimentations/interfaces/i-movimentations';
import { MovimentationsService } from '../../../services/movimentations/movimentations.service';
import { PayloadService } from '../../../services/payload/payload.service';
import { IPayload } from '../../../services/payload/interfaces/i-payload';

@Component({
  selector: 'app-movimentations',
  templateUrl: './movimentations.page.html',
  styleUrls: ['./movimentations.page.scss'],
})
export class MovimentationsPage
  extends BaseComponent
  implements OnInit, ViewDidEnter
{
  // #region Properties (5)

  public isLoading = true;
  public maxItemsToShow: number = 0;
  public movimentations: IMovimentations[] | null = [];
  public movimentationsFilter: IMovimentations[] | null = [];
  public payload: IPayload | null = null;

  // #endregion Properties (5)

  // #region Constructors (1)

  constructor(
    private readonly movimentationsService: MovimentationsService,
    private readonly payloadService: PayloadService,
    private renderer: Renderer2,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
    this.updateMaxItemsToShow();
    this.renderer.listen('window', 'resize', () => {
      this.updateMaxItemsToShow();
    });
  }

  // #endregion Constructors (1)

  // #region Public Getters And Setters (2)

  public get filteredEntries(): IMovimentations[] | null {
    return (
      this.movimentationsFilter
        ?.filter((mov) => mov.type === EMovimentationType.ENTRY)
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ) || []
    );
  }

  public get filteredExits(): IMovimentations[] | null {
    return (
      this.movimentationsFilter
        ?.filter((mov) => mov.type === EMovimentationType.EXIT)
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ) || []
    );
  }

  // #endregion Public Getters And Setters (2)

  // #region Public Methods (5)

  public expandEntries() {}

  public expandExits() {}

  public ionViewDidEnter(): void {
    this.getAll();
  }

  public ngOnInit() {
    this.subs.push(
      this.payloadService.payload$.subscribe((res) => (this.payload = res)),
      this.movimentationsService.movimentations$.subscribe(
        (res) => (this.movimentations = res)
      ),
      this.movimentationsService.movimentationsFiltered$.subscribe(
        (res) => (this.movimentationsFilter = res)
      )
    );
  }

  public onReload() {
    this.getAll();
  }

  // #endregion Public Methods (5)

  // #region Private Methods (2)

  private getAll() {
    this.isLoading = true;
    this.movimentationsService.getAll().subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log('[MOV]', res);
      },
      error: (err) => {
        console.error(err);
        this.alert('Erro ao carregar movimentações.', 'Atenção!');
        this.isLoading = false;
      },
    });
  }

  private updateMaxItemsToShow() {
    const screenHeight = window.innerHeight;
    const headerHeight = 56;
    const cardHeaderHeight = 50;
    const itemHeight = 100;
    const padding = 40;

    const availableHeight =
      screenHeight - headerHeight - cardHeaderHeight * 2 - padding;
    const itemsPerList = Math.floor(availableHeight / (itemHeight * 2));

    this.maxItemsToShow = itemsPerList > 0 ? itemsPerList : 1;
  }

  // #endregion Private Methods (2)
}

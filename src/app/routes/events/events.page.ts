import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
  ViewDidEnter,
} from '@ionic/angular';
import { EMovimentationType } from 'src/services/movimentations/interfaces/enum/movimentation-type.enum';
import { EMovimentationEvent } from '../../../services/movimentations/interfaces/enum/movimentation-role.enum';
import { IMovimentations } from '../../../services/movimentations/interfaces/i-movimentations';
import { MovimentationsService } from '../../../services/movimentations/movimentations.service';
import { IPayload } from '../../../services/payload/interfaces/i-payload';
import { PayloadService } from '../../../services/payload/payload.service';
import { BaseComponent } from '../../../shared/utils/base.component';
import { ERouters } from '../../../shared/utils/e-routers';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage extends BaseComponent implements OnInit, ViewDidEnter {
  // #region Properties (5)

  public isLoading = true;
  public maxItemsToShow: number = 0;
  public movimentations: IMovimentations[] = [];
  public movimentationsFilter: IMovimentations[] = [];
  public payload: IPayload | null = null;
  public homeURL = `/${ERouters.app}/${ERouters.home}`;
  public defaultURL = ERouters.home;
  public availableHeight: number = 0;
  public mobileShow = false;

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
    this.onResize();
  }

  // #endregion Constructors (1)

  @HostListener('window:resize')
  public onResize() {
    this.mobileShow = window.innerWidth <= 878;
  }

  // #endregion Public Getters And Setters (2)

  // #region Public Methods (5)

  public expandMovimentations() {
    const addItems = Math.floor(this.availableHeight / 200);

    this.maxItemsToShow += addItems;
  }

  public ionViewDidEnter(): void {
    this.onGetAll();
  }

  public ngOnInit() {
    this.subs.push(
      this.payloadService.payload$.subscribe((res) => (this.payload = res)),
      this.movimentationsService.movimentations$.subscribe(
        (res) => (this.movimentations = res)
      ),
      this.movimentationsService.movimentationsFiltered$.subscribe((res) => {
        this.movimentationsFilter = res;
        if (this.movimentationsFilter?.length) {
          this.movimentationsFilter = this.movimentationsFilter?.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
        }
      })
    );
  }

  public getEvent(event: EMovimentationEvent): string {
    switch (event) {
      case EMovimentationEvent.ENTRY:
        return 'INSERÇÃO';
      case EMovimentationEvent.EDIT:
        return 'EDIÇÃO';
      case EMovimentationEvent.EXIT:
        return 'REMOÇÃO';
    }
  }

  public getType(type: EMovimentationType): string {
    switch (type) {
      case EMovimentationType.USER:
        return 'USUÁRIO';
      case EMovimentationType.AREA:
        return 'ÁREA';
      case EMovimentationType.GENERAL:
        return 'NÃO MAPEADA';
      case EMovimentationType.WAREHOUSE:
        return 'ALMOXARIFADO';
      case EMovimentationType.MATERIAL:
        return 'MATERIAL';
      case EMovimentationType.LOAN:
        return 'EMPRÉSTIMO';
      case EMovimentationType.MAINTENANCE:
        return 'MANUTENÇÃO';
    }
  }

  public getDate(toFormat: Date): string {
    const date = new Date(toFormat);
    const formattedDate = date.toLocaleString();

    const [datePart, timePart] = formattedDate.split(', ');
    const timeWithoutSeconds = timePart.split(':').slice(0, 2).join(':');
    return `${datePart}\n${timeWithoutSeconds}`;
  }

  public onReload() {
    this.onGetAll();
  }

  // #endregion Public Methods (5)

  // #region Private Methods (2)

  private onGetAll() {
    this.isLoading = true;
    this.movimentationsService.getAll().subscribe({
      next: (res) => {
        this.isLoading = false;
        // console.log('[MOV]', res);
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
    const headerHeight = 92;
    const cardHeaderHeight = 45;
    const itemHeight = 25;
    const padding = 40;

    this.availableHeight =
      screenHeight - headerHeight - cardHeaderHeight * 2 - padding;
    const itemsPerList = Math.floor(this.availableHeight / (itemHeight * 2));

    this.maxItemsToShow = itemsPerList > 0 ? itemsPerList + 1 : 1;
  }

  // #endregion Private Methods (2)
}

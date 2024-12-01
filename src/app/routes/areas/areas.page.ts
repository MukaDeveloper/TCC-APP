import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
  ViewDidEnter,
} from '@ionic/angular';
import { AreasService } from 'src/services/areas/areas.service';
import { IArea } from 'src/services/areas/interfaces/i-area';
import { BaseComponent } from '../../../shared/utils/base.component';
import { ERouters } from '../../../shared/utils/e-routers';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.page.html',
  styleUrls: ['./areas.page.scss'],
})
export class AreasPage extends BaseComponent implements OnInit, ViewDidEnter {
  // #region Properties (2)

  public areas: IArea[] = [];
  public isLoading = true;
  public homeURL = `/${ERouters.app}/${ERouters.home}`;
  public defaultURL = ERouters.home;

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor(
    private readonly areasService: AreasService,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  // #endregion Constructors (1)

  // #region Public Getters And Setters (1)

  public get columnSize(): number {
    if (window.innerWidth <= 950 && window.innerWidth > 798) {
      return 4;
    }
    if (window.innerWidth <= 798) {
      return 6;
    }
    return 3;
  }

  // #endregion Public Getters And Setters (1)

  // #region Public Methods (6)

  public ionViewDidEnter(): void {
    this.onGetAll();
  }

  public ngOnInit() {
    this.subs.push(
      this.areasService.areas$.subscribe((res) => {
        this.areas = res;
      })
    );
  }

  public onDeleteArea(area: IArea) {
    this.alertController
      .create({
        cssClass: 'custom-alert',
        header: 'Excluir Área',
        message: `Deseja realmente excluir a área ${area.name}?`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Sim',
            handler: () => {
              this.areasService.delete(area.id).subscribe({
                next: (_) => {
                  this.toast('Área excluída com sucesso!', 'Sucesso');
                  this.onReload();
                },
                error: (err) => {
                  this.alert(err?.message, 'Atenção!');
                },
              });
            },
          },
        ],
      })
      .then((a) => a.present());
  }

  public onGetAll() {
    this.isLoading = true;
    this.areasService.getAll().subscribe({
      next: (res) => {
        this.isLoading = false;
      },
      error: (err) => {
        // console.log('[AREAERR]', err);
        this.alert(err?.message, 'Atenção!');
        this.isLoading = false;
      },
    });
  }

  public onReload() {
    this.onGetAll();
  }

  public selectArea(area: any) {
    // console.log('[AREA]', area);
  }

  // #endregion Public Methods (6)
}

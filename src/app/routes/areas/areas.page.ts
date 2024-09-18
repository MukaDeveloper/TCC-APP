import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { AreasService } from 'src/services/areas/areas.service';
import { IArea } from 'src/services/areas/interfaces/i-area';
import { BaseComponent } from '../../../shared/utils/base.component';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.page.html',
  styleUrls: ['./areas.page.scss'],
})
export class AreasPage extends BaseComponent implements OnInit {
  // #region Properties (2)

  public areas: IArea[] | null = [];
  public isLoading = true;

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

  // #region Public Methods (5)

  public deleteArea(area: any) {}

  public ngOnInit() {
    this.subs.push(
      this.areasService.areas$.subscribe((res) => {
        this.areas = res;
      })
    );

    this.isLoading = false;
  }

  public onReload() {
    this.isLoading = true;
    this.areasService.getAll().subscribe({
      next: (res) => {
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }

  public selectArea(area: any) {
    console.log('[AREA]', area);
  }

  // #endregion Public Methods (5)
}

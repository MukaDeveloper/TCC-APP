import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/utils/base.component';
import {
  ToastController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { IMaterial } from '../../../services/materials/interfaces/i-material';
import { MaterialsService } from '../../../services/materials/materials.service';
import { PayloadService } from '../../../services/payload/payload.service';
import { IPayload } from '../../../services/payload/interfaces/i-payload';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.page.html',
  styleUrls: ['./materials.page.scss'],
})
export class MaterialsPage extends BaseComponent implements OnInit {
  // #region Properties (3)

  public filtered: IMaterial[] | null = [];
  public isLoading = true;
  public payload: IPayload | null = null;

  // #endregion Properties (3)

  // #region Constructors (1)

  constructor(
    private readonly payloadService: PayloadService,
    private readonly materialsService: MaterialsService,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  // #endregion Constructors (1)

  // #region Public Methods (2)

  public getMaterialIcon(material: IMaterial): string {
    if (!material.imageURL) {
      return 'assets/imgs/dummy.jpg';
    }
    return material.imageURL;
  }

  public ngOnInit() {
    this.subs.push(
      this.payloadService.payload$.subscribe((res) => (this.payload = res)),
      this.materialsService.filtered$.subscribe((res) => (this.filtered = res))
    );
    this.onGetAll();
  }

  public onCreate() {

  }
  
  public onReload() {
    this.filtered = [];
    this.isLoading = true;
    this.onGetAll();
  }
  // #endregion Public Methods (2)

  // #region Private Methods (1)

  private onGetAll() {
    this.materialsService.getAll(0, 20).subscribe({
      next: () => (this.isLoading = false),
      error: (err) => {
        this.isLoading = false;
        this.toast(err.message, 'Erro!', 'danger');
      },
    });
  }

  // #endregion Private Methods (1)
}

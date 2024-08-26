import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { SidebarService } from '../../../services/sidebar/sidebar.service';
import { BaseComponent } from '../../../shared/utils/base.component';
import { sidebarMenu } from './sidebar-menus';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent extends BaseComponent implements OnInit {
  // #region Properties (1)

  public isLoading = true;

  // #endregion Properties (1)

  // #region Constructors (1)

  constructor(
    private readonly sidebarService: SidebarService,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
    sidebarService.addMenu(sidebarMenu);
  }

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public ngOnInit() {
    this.isLoading = false;
  }

  // #endregion Public Methods (1)
}

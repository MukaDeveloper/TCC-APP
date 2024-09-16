import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { PayloadService } from 'src/services/payload/payload.service';
import { IPayload } from '../../../services/payload/interfaces/i-payload';
import { SidebarService } from '../../../services/sidebar/sidebar.service';
import { BaseComponent } from '../../../shared/utils/base.component';
import { sidebarMenu } from './sidebar-menus';
import { IMenu } from 'src/services/sidebar/interfaces/i-menus';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent extends BaseComponent implements OnInit {
  // #region Properties (4)

  public isLoading = true;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('isMenuOpen') public isMenuOpen = false;
  public menus: IMenu[] | null = [];
  public payload: IPayload | null = null;

  // #endregion Properties (4)

  // #region Constructors (1)

  constructor(
    private readonly payloadService: PayloadService,
    private readonly sidebarService: SidebarService,
    private router: Router,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
    sidebarService.addMenu(sidebarMenu);
  }

  // #endregion Constructors (1)

  // #region Public Getters And Setters (1)

  public get routerLinkActive() {
    return this.router.url;
  }

  // #endregion Public Getters And Setters (1)

  // #region Public Methods (2)

  public ngOnInit() {
    this.subs.push(
      this.sidebarService.menuItems$.subscribe((res) => (this.menus = res)),
      this.payloadService.payload$.subscribe((res) => (this.payload = res))
    );
  }

  public onNavigate(link: string) {
    this.router.navigateByUrl(link);
  }

  // #endregion Public Methods (2)
}

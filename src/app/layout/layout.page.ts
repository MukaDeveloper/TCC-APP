import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayloadService } from '../../services/payload/payload.service';
import { RoutersEnum } from '../../shared/utils/routers-enum';
import { InstitutionService } from '../../services/instution/intitution.service';
import { WarehousesService } from '../../services/warehouses/warehouses.service';
import { IPayload } from '../../services/payload/interfaces/i-payload';
import { map, merge, mergeMap } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit {
  // #region Properties (1)

  public isLoading = true;
  public isMenuOpen = false;
  public payload: IPayload | null = null;

  // #endregion Properties (1)

  // #region Constructors (1)

  constructor(
    private readonly payloadService: PayloadService,
    private readonly institutionService: InstitutionService,
    private readonly warehousesService: WarehousesService,
    private router: Router,
  ) {}

  // #endregion Constructors (1)

  // #region Public Methods (1)

  onSplitPaneVisible(event: any) {
    this.isMenuOpen = event.detail.visible;
  }

  public ngOnInit() {
    this.isLoading = false;
    this.onPayload();
  }

  public onLogout() {
    this.payloadService.nextPayload(null);
    this.router.navigate([RoutersEnum.login], {
      queryParams: { redirected: true },
    });
  }

  private onPayload() {
    console.log('Fazendo requisição de instituição e armazéns');
    this.institutionService
      .getById(this.payload?.institutionId as number)
      .pipe(
        mergeMap(() => this.warehousesService.getAll()),
      )
      .subscribe({
        next: (res) => {},
        error: (err) => {},
      });
    this.isLoading = false;
  }

  // #endregion Public Methods (1)
}

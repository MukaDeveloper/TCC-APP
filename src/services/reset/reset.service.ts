import { Injectable } from '@angular/core';
import { AreasService } from '../areas/areas.service';
import { InstitutionService } from '../instution/intitution.service';
import { MovimentationsService } from '../movimentations/movimentations.service';
import { WarehousesService } from '../warehouses/warehouses.service';
import { MaterialsService } from '../materials/materials.service';

@Injectable({
  providedIn: 'root',
})
export class ResetService {
  // #region Constructors (1)

  constructor(
    private readonly areasService: AreasService,
    private readonly institutionService: InstitutionService,
    private readonly movimentationsService: MovimentationsService,
    private readonly warehousesService: WarehousesService,
    private readonly materialsService: MaterialsService,
  ) {}

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public resetAll() {
    this.areasService.reset();
    this.institutionService.reset();
    this.movimentationsService.reset();
    this.warehousesService.reset();
    this.materialsService.reset();
  }

  // #endregion Public Methods (1)
}

import { Injectable } from '@angular/core';
import { AreasService } from '../areas/areas.service';
import { MovimentationsService } from '../movimentations/warehouses.service';
import { WarehousesService } from '../warehouses/warehouses.service';
import { InstitutionService } from '../instution/intitution.service';

@Injectable({
  providedIn: 'root',
})
export class ResetService {
  constructor(
    private readonly areasService: AreasService,
    private readonly institutionService: InstitutionService,
    private readonly movimentationsService: MovimentationsService,
    private readonly warehousesService: WarehousesService
  ) {}

  public resetAll() {
    this.areasService.reset();
    this.institutionService.reset();
    this.movimentationsService.reset();
    this.warehousesService.reset();
  }
}

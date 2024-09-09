import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApiWarehousesService } from 'src/app/api/api-warehouses.service';
import { IEnvelopeArray } from 'src/shared/utils/envelope';
import { IWarehouse } from './interfaces/i-warehouse';

@Injectable({
  providedIn: 'root',
})
export class WarehousesService {
  private warehousesSubject: BehaviorSubject<IWarehouse[] | null>;
  public warehouses$: Observable<IWarehouse[] | null>;

  constructor(private readonly apiWarehousesService: ApiWarehousesService) {
    this.warehousesSubject = new BehaviorSubject<IWarehouse[] | null>(null);
    this.warehouses$ = this.warehousesSubject.asObservable();
  }

  public getAll(): Observable<IEnvelopeArray<IWarehouse>> {
    return this.apiWarehousesService.getAll().pipe(
      map((res: IEnvelopeArray<IWarehouse>) => {
        if (res?.items?.length) {
          this.warehousesSubject.next(res.items);
        }
        return res;
      })
    );
  }
}

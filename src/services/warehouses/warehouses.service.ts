import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApiWarehousesService } from 'src/app/api/api-warehouses.service';
import { IEnvelope, IEnvelopeArray } from 'src/shared/utils/envelope';
import { IWarehouse } from './interfaces/i-warehouse';

@Injectable({
  providedIn: 'root',
})
export class WarehousesService {
  private warehousesSubject: BehaviorSubject<IWarehouse[] | null>;
  public warehouses$: Observable<IWarehouse[] | null>;

  private selectedWarehouseSubject: BehaviorSubject<IWarehouse | null>;
  public selectedWarehouse$: Observable<IWarehouse | null>;

  constructor(private readonly apiWarehousesService: ApiWarehousesService) {
    this.warehousesSubject = new BehaviorSubject<IWarehouse[] | null>([]);
    this.warehouses$ = this.warehousesSubject.asObservable();
    this.selectedWarehouseSubject = new BehaviorSubject<IWarehouse | null>(null);
    this.selectedWarehouse$ = this.selectedWarehouseSubject.asObservable();
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

  public create(data: IWarehouse): Observable<IEnvelope<IWarehouse>> {
    return this.apiWarehousesService.create(data).pipe(
      map((res: IEnvelope<IWarehouse>) => {
        if (res?.item) {
          this.selectedWarehouseSubject.next(res.item);
          const index = this.warehousesSubject.value?.findIndex((w) => w.id === res.item.id) as number;
          if (this.warehousesSubject.value?.length) {
            if (index >= 0) {
              this.warehousesSubject.value[index] = res.item;
            } else {
              this.warehousesSubject.value.push(res.item);
            }
          } else {
            this.warehousesSubject.next([res.item]);
          }
        }
        return res;
      })
    );
  }
}

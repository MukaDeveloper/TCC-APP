import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApiWarehousesService } from 'src/app/api/api-warehouses.service';
import { IEnvelope, IEnvelopeArray } from 'src/shared/utils/envelope';
import { IWarehouse } from './interfaces/i-warehouse';
import { NewWarehouseDto } from './dto/new-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@Injectable({
  providedIn: 'root',
})
export class WarehousesService {
  // #region Properties (2)

  public selectedWarehouse$: BehaviorSubject<IWarehouse | null> =
    new BehaviorSubject<IWarehouse | null>(null);
  public warehouses$: BehaviorSubject<IWarehouse[] | null> =
    new BehaviorSubject<IWarehouse[] | null>([]);
  public filtered$: BehaviorSubject<IWarehouse[] | null> =
    new BehaviorSubject<IWarehouse[] | null>([]);

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor(private readonly apiWarehousesService: ApiWarehousesService) {}

  // #endregion Constructors (1)

  // #region Public Methods (4)

  public create(data: NewWarehouseDto): Observable<IEnvelope<IWarehouse>> {
    return this.apiWarehousesService.create(data).pipe(
      map((res: IEnvelope<IWarehouse>) => {
        if (res?.item) {
          this.selectedWarehouse$.next(res.item);
          const index = this.warehouses$.value?.findIndex(
            (w) => w.id === res.item.id
          ) as number;
          if (this.warehouses$.value?.length) {
            if (index >= 0) {
              this.warehouses$.value[index] = res.item;
            } else {
              this.warehouses$.value.push(res.item);
            }
          } else {
            this.warehouses$.next([res.item]);
          }
        }
        return res;
      })
    );
  }

  public getAll(): Observable<IEnvelopeArray<IWarehouse>> {
    return this.apiWarehousesService.getAll().pipe(
      map((res: IEnvelopeArray<IWarehouse>) => {
        if (res?.items?.length) {
          this.warehouses$.next(res.items);
          this.filtered$.next(res.items);
        }
        return res;
      })
    );
  }

  public searchByName(query: string): Observable<IEnvelopeArray<IWarehouse>> {
    return this.apiWarehousesService.searchByName(query).pipe(
      map((res) => {
        if (res?.items?.length) {
          this.filtered$.next(res.items);
        }
        return res;
      })
    );
  }

  public reset() {
    this.warehouses$.next(null);
    this.selectedWarehouse$.next(null);
  }

  public updateWarehouse(data: UpdateWarehouseDto): Observable<IEnvelope<IWarehouse>> {
    return this.apiWarehousesService.update(data).pipe(
      map((res: IEnvelope<IWarehouse>) => {
        if (res?.item) {
          this.selectedWarehouse$.next(res.item);
          const index = this.warehouses$.value?.findIndex(
            (w) => w.id === res.item.id
          ) as number;
          if (this.warehouses$.value?.length) {
            if (index >= 0) {
              this.warehouses$.value[index] = res.item;
            } else {
              this.warehouses$.value.push(res.item);
            }
          } else {
            this.warehouses$.next([res.item]);
          }
        }
        return res;
      })
    );
  }

  // #endregion Public Methods (4)
}

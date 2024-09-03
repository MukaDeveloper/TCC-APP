import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApiWarehousesService } from 'src/app/api/api-warehouses.service';
import { IEnvelope } from 'src/shared/utils/envelope';

@Injectable({
  providedIn: 'root',
})
export class WarehousesService {
  private warehousesSubject: BehaviorSubject<any | null>;
  public warehouses$: Observable<any | null>;

  constructor(private readonly apiWarehousesService: ApiWarehousesService) {
    this.warehousesSubject = new BehaviorSubject<any | null>(null);
    this.warehouses$ = this.warehousesSubject.asObservable();
  }

  public getAll(): Observable<IEnvelope<any>> {
    return this.apiWarehousesService.getAll().pipe(
      map((res: IEnvelope<any>) => {
        if (res?.item) {
          this.warehousesSubject.next(res.item);
        }
        return res;
      })
    );
  }
}

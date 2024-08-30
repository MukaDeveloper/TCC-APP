import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApiWarehousesService } from 'src/app/api/api-warehouses.service';

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

  public getAll(): Observable<any> {
    return this.apiWarehousesService.getAll().pipe(
      map((res: any) => {
        if (res) {
          this.warehousesSubject.next(res);
        }
      })
    );
  }
}

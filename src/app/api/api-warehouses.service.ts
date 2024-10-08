import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { IWarehouse } from 'src/services/warehouses/interfaces/i-warehouse';
import { HandleError } from 'src/shared/middlewares/error.handler';
import { ApiBaseService } from 'src/shared/utils/api-base.service';
import { IEnvelope, IEnvelopeArray } from 'src/shared/utils/envelope';
import { NewWarehouseDto } from '../../services/warehouses/dto/new-warehouse.dto';
import { UpdateWarehouseDto } from '../../services/warehouses/dto/update-warehouse.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiWarehousesService extends ApiBaseService {
  // #region Constructors (1)

  constructor(http: HttpClient) {
    super(http);
  }

  // #endregion Constructors (1)

  // #region Public Methods (3)

  public create(data: NewWarehouseDto): Observable<IEnvelope<IWarehouse>> {
    const url = `${this.apiUrl}/Warehouses/create`;
    return this.http
      .post<IEnvelope<IWarehouse>>(url, data)
      .pipe(catchError(HandleError.handler));
  }

  public getAll(): Observable<IEnvelopeArray<IWarehouse>> {
    const url = `${this.apiUrl}/Warehouses/get-all`;
    return this.http
      .get<IEnvelopeArray<IWarehouse>>(url)
      .pipe(catchError(HandleError.handler));
  }

  public searchByName(query: string): Observable<IEnvelopeArray<IWarehouse>> {
    const url = `${this.apiUrl}/Warehouses/search-by-name/${query}`;
    return this.http
      .get<IEnvelopeArray<IWarehouse>>(url)
      .pipe(catchError(HandleError.handler));
  }
  public update(data: UpdateWarehouseDto): Observable<IEnvelope<IWarehouse>> {
    const url = `${this.apiUrl}/Warehouses/update`;
    return this.http
      .put<IEnvelope<IWarehouse>>(url, data)
      .pipe(catchError(HandleError.handler));
  }

  public deleteWarehouse(warehouseId: number): Observable<null> {
    const url = `${this.apiUrl}/Warehouses/${warehouseId}`;
    return this.http
      .delete<null>(url)
      .pipe(catchError(HandleError.handler));
  }

  // #endregion Public Methods (3)
}

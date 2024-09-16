import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { IWarehouse } from 'src/services/warehouses/interfaces/i-warehouse';
import { HandleError } from 'src/shared/middlewares/error.handler';
import { ApiBaseService } from 'src/shared/utils/api-base.service';
import { IEnvelope, IEnvelopeArray } from 'src/shared/utils/envelope';

@Injectable({
  providedIn: 'root',
})
export class ApiWarehousesService extends ApiBaseService {
  // #region Constructors (1)

  constructor(http: HttpClient) {
    super(http);
  }

  // #endregion Constructors (1)

  // #region Public Methods (2)

  public create(data: IWarehouse): Observable<IEnvelope<IWarehouse>> {
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

  // #endregion Public Methods (2)
}

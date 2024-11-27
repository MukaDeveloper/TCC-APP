import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiBaseService } from 'src/shared/utils/api-base.service';
import { IEnvelope, IEnvelopeArray } from '../../shared/utils/envelope';
import { HandleError } from '../../shared/middlewares/error.handler';

@Injectable({
  providedIn: 'root',
})
export class ApiSolicitationsService extends ApiBaseService {
  // #region Constructors (1)

  constructor(http: HttpClient) {
    super(http);
  }

  // #endregion Constructors (1)

  // #region Public Methods (2)

  public get(): Observable<IEnvelopeArray<any>> {
    const url = `${this.apiUrl}/Solicitations`;
    return this.http
      .get<IEnvelopeArray<any>>(url)
      .pipe(catchError(HandleError.handler));
  }

  public create(data: any): Observable<IEnvelope<any>> {
    const url = `${this.apiUrl}/Solicitations`;
    return this.http
      .post<IEnvelope<any>>(url, data)
      .pipe(catchError(HandleError.handler));
  }

  // #endregion Public Methods (2)
}

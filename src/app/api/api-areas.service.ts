import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { IArea } from 'src/services/areas/interfaces/i-area';
import { HandleError } from 'src/shared/middlewares/error.handler';
import { ApiBaseService } from 'src/shared/utils/api-base.service';
import { IEnvelope, IEnvelopeArray } from 'src/shared/utils/envelope';

@Injectable({
  providedIn: 'root',
})
export class ApiAreasService extends ApiBaseService {
  // #region Constructors (1)

  constructor(http: HttpClient) {
    super(http);
  }

  // #endregion Constructors (1)

  // #region Public Methods (2)

  public getAll(): Observable<IEnvelopeArray<IArea>> {
    const url = `${this.apiUrl}/Areas/get-all`;
    return this.http
      .get<IEnvelopeArray<IArea>>(url)
      .pipe(catchError(HandleError.handler));
  }

  public newArea(data: IArea): Observable<IEnvelope<IArea>> {
    const url = `${this.apiUrl}/Areas/add-new`;
    return this.http
      .post<IEnvelope<IArea>>(url, data)
      .pipe(catchError(HandleError.handler));
  }

  // #endregion Public Methods (2)
}

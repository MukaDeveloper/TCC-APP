import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HandleError } from 'src/shared/middlewares/error.handler';
import { ApiBaseService } from 'src/shared/utils/api-base.service';
import { IEnvelope, IEnvelopeArray } from 'src/shared/utils/envelope';
import { IInstitution } from '../../services/instution/interfaces/i-institution';

@Injectable({
  providedIn: 'root',
})
export class ApiInstitutionService extends ApiBaseService {
  // #region Constructors (1)

  constructor(http: HttpClient) {
    super(http);
  }

  // #endregion Constructors (1)

  // #region Public Methods (2)

  public getAllByUser(): Observable<IEnvelopeArray<IInstitution>> {
    const url = `${this.apiUrl}/Institution/get-all-by-user`;
    return this.http
      .get<IEnvelopeArray<IInstitution>>(url)
      .pipe(catchError(HandleError.handler));
  }

  public getById(id: number): Observable<IEnvelope<IInstitution>> {
    const url = `${this.apiUrl}/Institution/by-id/${id}`;
    return this.http
      .get<IEnvelope<IInstitution>>(url)
      .pipe(catchError(HandleError.handler));
  }

  public getCurrent(): Observable<IEnvelope<IInstitution>> {
    const url = `${this.apiUrl}/Institution/get-current`;
    return this.http
      .get<IEnvelope<IInstitution>>(url)
      .pipe(catchError(HandleError.handler));
  }

  // #endregion Public Methods (2)
}

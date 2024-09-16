import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HandleError } from 'src/shared/middlewares/error.handler';
import { ApiBaseService } from 'src/shared/utils/api-base.service';
import { IInstitution } from '../../services/instution/interfaces/i-institution';
import { IEnvelope } from 'src/shared/utils/envelope';

@Injectable({
  providedIn: 'root',
})
export class ApiInstitutionService extends ApiBaseService {
  // #region Constructors (1)

  constructor(http: HttpClient) {
    super(http);
  }

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public getCurrent(): Observable<IEnvelope<IInstitution>> {
    const url = `${this.apiUrl}/Institution/get-current`;
    return this.http
      .get<IEnvelope<IInstitution>>(url)
      .pipe(catchError(HandleError.handler));
  }

  // #endregion Public Methods (1)
}
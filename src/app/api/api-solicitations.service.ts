import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiBaseService } from 'src/shared/utils/api-base.service';
import { IEnvelope, IEnvelopeArray } from '../../shared/utils/envelope';
import { HandleError } from '../../shared/middlewares/error.handler';
import { NewSolicitationDto } from 'src/services/solicitations/dto/new-solicitation.dto';
import { ISolicitation } from 'src/services/solicitations/interfaces/i-solicitation';
import { UpdateSolicitationDto } from 'src/services/solicitations/dto/update-solicitation.dto';

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

  public get(): Observable<IEnvelopeArray<ISolicitation>> {
    const url = `${this.apiUrl}/Solicitations`;
    // console.log('apiSolicitationsService -> get');
    return this.http
      .get<IEnvelopeArray<ISolicitation>>(url)
      .pipe(catchError(HandleError.handler));
  }

  public create(
    data: NewSolicitationDto
  ): Observable<IEnvelope<ISolicitation>> {
    const url = `${this.apiUrl}/Solicitations`;
    return this.http
      .post<IEnvelope<ISolicitation>>(url, data)
      .pipe(catchError(HandleError.handler));
  }

  public update(
    data: UpdateSolicitationDto
  ): Observable<IEnvelope<ISolicitation>> {
    const url = `${this.apiUrl}/Solicitations/update`;
    return this.http
      .put<IEnvelope<ISolicitation>>(url, data)
      .pipe(catchError(HandleError.handler));
  }

  // #endregion Public Methods (2)
}

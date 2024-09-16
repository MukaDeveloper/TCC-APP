import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { IArea } from 'src/services/areas/interfaces/i-area';
import { HandleError } from 'src/shared/middlewares/error.handler';
import { ApiBaseService } from 'src/shared/utils/api-base.service';
import { IEnvelope, IEnvelopeArray } from 'src/shared/utils/envelope';
import { IMovimentations } from '../../services/movimentations/interfaces/i-movimentations';

@Injectable({
  providedIn: 'root',
})
export class ApiMovimentationsService extends ApiBaseService {
  // #region Constructors (1)

  constructor(http: HttpClient) {
    super(http);
  }

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public getAll(): Observable<IEnvelopeArray<IMovimentations>> {
    const url = `${this.apiUrl}/Movimentations/get-all`;
    return this.http
      .get<IEnvelopeArray<IMovimentations>>(url)
      .pipe(catchError(HandleError.handler));
  }

  // #endregion Public Methods (1)
}

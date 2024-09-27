import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiBaseService } from 'src/shared/utils/api-base.service';
import { IEnvelopeArray } from '../../shared/utils/envelope';
import { HandleError } from '../../shared/middlewares/error.handler';
import { IMaterial } from '../../services/materials/interfaces/i-material';

@Injectable({
  providedIn: 'root',
})
export class ApiMaterialsService extends ApiBaseService {
  // #region Constructors (1)

  constructor(http: HttpClient) {
    super(http);
  }

  // #endregion Constructors (1)

  // #region Public Methods (2)

  public getAll(
    lastDocId: number,
    limit: number
  ): Observable<IEnvelopeArray<IMaterial>> {
    const url = `${this.apiUrl}/Materials/get-all?lastDocId=${lastDocId}&limit=${limit}`;
    return this.http
      .get<IEnvelopeArray<IMaterial>>(url)
      .pipe(catchError(HandleError.handler));
  }

  // #endregion Public Methods (2)
}

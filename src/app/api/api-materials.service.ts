import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { ApiBaseService } from 'src/shared/utils/api-base.service';
import { IEnvelope, IEnvelopeArray } from '../../shared/utils/envelope';
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

  public async getByIdAsync(id: number): Promise<IEnvelope<IMaterial>> {
    const url = `${this.apiUrl}/Materials/get-by-id/${id}`;
    return await firstValueFrom(this.http.get<IEnvelope<IMaterial>>(url));
  }

  public getAll(
    lastDocId: number,
    limit: number
  ): Observable<IEnvelopeArray<IMaterial>> {
    const url = `${this.apiUrl}/Materials/get-all?lastDocId=${lastDocId}&limit=${limit}`;
    return this.http
      .get<IEnvelopeArray<IMaterial>>(url)
      .pipe(catchError(HandleError.handler));
  }

  public addNew(data: any): Observable<IEnvelope<IMaterial>> {
    const url = `${this.apiUrl}/Materials/add-new`;
    return this.http
      .post<IEnvelope<IMaterial>>(url, data)
      .pipe(catchError(HandleError.handler));
  }

  // #endregion Public Methods (2)
}

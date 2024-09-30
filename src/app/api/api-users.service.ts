import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HandleError } from 'src/shared/middlewares/error.handler';
import { ApiBaseService } from 'src/shared/utils/api-base.service';
import { IEnvelope } from 'src/shared/utils/envelope';
import { CredentialsDto } from '../../services/users/dto/credentials.dto';
import { RegisterDto } from 'src/services/users/dto/register.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiUsersService extends ApiBaseService {
  // #region Constructors (1)

  constructor(http: HttpClient) {
    super(http);
  }

  // #endregion Constructors (1)

  // #region Public Methods (2)

  public auth(credentials: CredentialsDto): Observable<IEnvelope<string>> {
    const url = `${this.apiUrl}/Users/auth`;
    return this.http
      .post<IEnvelope<string>>(url, credentials)
      .pipe(catchError(HandleError.handler));
  }

  public register(credentials: RegisterDto): Observable<IEnvelope<any>> {
    const url = `${this.apiUrl}/Users/register`;
    return this.http
      .post<IEnvelope<any>>(url, credentials)
      .pipe(catchError(HandleError.handler));
  }

  public selectInstitution(id: number): Observable<IEnvelope<string>> {
    const url = `${this.apiUrl}/Users/select-institution/${id}`;
    return this.http
      .patch<IEnvelope<string>>(url, null)
      .pipe(catchError(HandleError.handler));
  }

  // #endregion Public Methods (2)
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { RegisterDto } from 'src/services/users/dto/register.dto';
import { HandleError } from 'src/shared/middlewares/error.handler';
import { ApiBaseService } from 'src/shared/utils/api-base.service';
import { IEnvelope, IEnvelopeArray } from 'src/shared/utils/envelope';
import { CredentialsDto } from '../../services/users/dto/credentials.dto';
import { IMember } from '../../services/users/interfaces/i-member';
import { AddUserInstitutionDto } from '../../services/users/dto/add-user-institution.dto';
import { SelectInstitutionDto } from '../../services/users/dto/select-institution.dto';

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

  public selectInstitution(data: SelectInstitutionDto): Observable<IEnvelope<string>> {
    const url = `${this.apiUrl}/Users/select-institution`;
    return this.http
      .patch<IEnvelope<string>>(url, data)
      .pipe(catchError(HandleError.handler));
  }

  public getAllFromInstitution(): Observable<IEnvelopeArray<IMember>> {
    const url = `${this.apiUrl}/Users/by-institution`;
    return this.http
      .get<IEnvelopeArray<IMember>>(url)
      .pipe(catchError(HandleError.handler));
  }

  public search(query: string): Observable<IEnvelopeArray<IMember>> {
    const url = `${this.apiUrl}/Users/search/${query}`;
    return this.http
      .get<IEnvelopeArray<IMember>>(url)
      .pipe(catchError(HandleError.handler));
  }

  public addInstitutionMember(data: AddUserInstitutionDto): Observable<IEnvelope<string>> {
    const url = `${this.apiUrl}/Users/add-institution-member`;
    return this.http
      .post<IEnvelope<string>>(url, data)
      .pipe(catchError(HandleError.handler));
  }

  public resendEmail(): Observable<IEnvelope<string>> {
    const url = `${this.apiUrl}/Users/resend-email`;
    return this.http
      .post<IEnvelope<string>>(url, {})
      .pipe(catchError(HandleError.handler));
  }

  // #endregion Public Methods (2)
}

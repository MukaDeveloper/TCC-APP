import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HandleError } from 'src/shared/middlewares/error.handler';
import { ApiBaseService } from 'src/shared/utils/api-base.service';

@Injectable({
  providedIn: 'root',
})
export class ApiUsersService extends ApiBaseService {
  // #region Constructors (1)

  constructor(http: HttpClient) {
    super(http);
  }

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public auth(credentials: {
    Email: string;
    PasswordString: string;
    InstitutionId: number;
  }): Observable<any> {
    const url = `${this.apiUrl}/Users/auth`;
    return this.http
      .post<any>(url, credentials)
      .pipe(catchError(HandleError.handler));
  }

  // #endregion Public Methods (1)
}

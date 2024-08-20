import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HandleError } from 'src/shared/middlewares/error.handler';
import { ApiBaseService } from 'src/shared/utils/api-base.service';

@Injectable({
  providedIn: 'root',
})
export class ApiUsersService extends ApiBaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public auth(credentials: {
    email: string;
    password: string;
  }): Observable<{ token: string }> {
    const url = `${this.apiUrl}/Users/Authenticate`;
    return this.http
      .post<{ token: string }>(url, credentials)
      .pipe(catchError(HandleError.handler));
  }
}

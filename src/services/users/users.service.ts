import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiUsersService } from 'src/app/api/api-users.service';
import { PayloadService } from './../payload/payload.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // #region Constructors (1)

  constructor(
    public apiUsersService: ApiUsersService,
    public payloadService: PayloadService
  ) {}

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public auth(credentials: {
    Email: string;
    PasswordString: string;
  }): Observable<any> {
    return this.apiUsersService.auth(credentials).pipe(
      map((res: any) => {
        if (res.token) {
          this.payloadService.nextPayload(res.token);
        } else {
          this.payloadService.nextPayload(null);
        }
        return res;
      })
    );
  }

  // #endregion Public Methods (1)
}

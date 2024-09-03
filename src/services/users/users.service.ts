import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiUsersService } from 'src/app/api/api-users.service';
import { PayloadService } from './../payload/payload.service';
import { IEnvelope } from 'src/shared/utils/envelope';

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
    InstitutionId: number;
  }): Observable<IEnvelope<string>> {
    return this.apiUsersService.auth(credentials).pipe(
      map((res: IEnvelope<string>) => {
        if (res?.item) {
          this.payloadService.nextPayload(res.item);
        } else {
          this.payloadService.nextPayload(null);
        }
        return res;
      })
    );
  }

  // #endregion Public Methods (1)
}

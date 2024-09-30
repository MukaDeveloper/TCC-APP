import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { ApiUsersService } from 'src/app/api/api-users.service';
import { PayloadService } from './../payload/payload.service';
import { IEnvelope } from 'src/shared/utils/envelope';
import { CredentialsDto } from './dto/credentials.dto';
import { RegisterDto } from './dto/register.dto';

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

  // #region Public Methods (2)

  public auth(credentials: CredentialsDto): Observable<IEnvelope<string>> {
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

  public register(credentials: RegisterDto): Observable<IEnvelope<any>> {
    return this.apiUsersService
      .register(credentials)
      .pipe(tap((res: IEnvelope<any>) => res));
  }

  public selectInstitution(id: number): Observable<IEnvelope<string>> {
    return this.apiUsersService.selectInstitution(id).pipe(
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

  // #endregion Public Methods (2)
}

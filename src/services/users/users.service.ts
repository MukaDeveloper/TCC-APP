import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { ApiUsersService } from 'src/app/api/api-users.service';
import { IEnvelope, IEnvelopeArray } from 'src/shared/utils/envelope';
import { PayloadService } from './../payload/payload.service';
import { AddUserInstitutionDto } from './dto/add-user-institution.dto';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { RegisterDto } from './dto/register.dto';
import { SelectInstitutionDto } from './dto/select-institution.dto';
import { IMember } from './interfaces/i-member';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // #region Constructors (1)

  private membersSubject: BehaviorSubject<IMember[] | null>;
  public members$: Observable<IMember[] | null>;

  constructor(
    public apiUsersService: ApiUsersService,
    public payloadService: PayloadService
  ) {
    this.membersSubject = new BehaviorSubject<IMember[] | null>([]);
    this.members$ = this.membersSubject.asObservable();
  }

  // #endregion Constructors (1)

  public get members(): IMember[] | null {
    return this.membersSubject.value;
  }

  // #region Public Methods (2)

  public getById(id: number): Observable<IEnvelope<IMember>> {
    return this.apiUsersService
      .getById(id)
      .pipe(map((res: IEnvelope<IMember>) => res));
  }

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

  public selectInstitution(
    data: SelectInstitutionDto
  ): Observable<IEnvelope<string>> {
    return this.apiUsersService.selectInstitution(data).pipe(
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

  public getAllFromInstitution(): Observable<IEnvelopeArray<IMember>> {
    return this.apiUsersService.getAllFromInstitution().pipe(
      map((res: IEnvelopeArray<IMember>) => {
        if (res.items) {
          this.membersSubject.next(res.items);
        }
        return res;
      })
    );
  }

  public search(query: string): Observable<IEnvelopeArray<IMember>> {
    return this.apiUsersService
      .search(query)
      .pipe(map((res: IEnvelopeArray<IMember>) => res));
  }

  public addInstitutionMember(
    data: AddUserInstitutionDto
  ): Observable<IEnvelope<IMember>> {
    return this.apiUsersService.addInstitutionMember(data).pipe(
      map((res: IEnvelope<IMember>) => {
        if (res.item) {
          let memberList = this.membersSubject.value;
          if (!memberList?.length) {
            memberList = [];
          }
          memberList.push(res.item);
          this.membersSubject.next(memberList);
        }
        return res;
      })
    );
  }

  public removeInstitutionMember(
    memberId: number
  ): Observable<IEnvelope<string>> {
    return this.apiUsersService
      .removeInstitutionMember(memberId)
      .pipe(map((res: IEnvelope<string>) => res));
  }

  public resendEmail(): Observable<IEnvelope<string>> {
    return this.apiUsersService.resendEmail().pipe(
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

  public confirmEmail(data: ConfirmEmailDto): Observable<IEnvelope<string>> {
    return this.apiUsersService.confirmEmail(data).pipe(
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

  public changeInstitution(): Observable<IEnvelope<string>> {
    return this.apiUsersService.changeInstitution().pipe(
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

import { PayloadService } from './../payload/payload.service';
import { Injectable } from "@angular/core";
import { Observable, map } from 'rxjs';
import { ApiUsersService } from "src/app/api/api-users.service";

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    public apiUsersService: ApiUsersService,
    public payloadService: PayloadService
  ) {}

  public auth(credentials: { email: string, password: string }): Observable<{ token: string; }> {
    return this.apiUsersService.auth(credentials).pipe(
      map((res: { token: string }) => {
        if (res.token) {
          this.payloadService.nextPayload(res.token);
        } else {
          this.payloadService.nextPayload(null);
        }
        return res;
      })
    )
  }
}

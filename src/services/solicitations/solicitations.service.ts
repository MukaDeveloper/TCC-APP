import { Observable, map } from 'rxjs';
import { IEnvelope } from 'src/shared/utils/envelope';
import { ApiSolicitationsService } from './../../app/api/api-solicitations';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SolicitationsService {
  constructor(
    private readonly apiSolicitationsService: ApiSolicitationsService
  ) {}

  public create(data: any): Observable<IEnvelope<any>> {
    return this.apiSolicitationsService.create(data).pipe(
      map((res: IEnvelope<any>) => {
        if (res?.item) {
          // aaaa
        }
        return res;
      })
    );
  }
}

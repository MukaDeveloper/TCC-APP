import { Observable, map } from 'rxjs';
import { IEnvelope, IEnvelopeArray } from 'src/shared/utils/envelope';
import { ApiSolicitationsService } from '../../app/api/api-solicitations.service';
import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SolicitationsService {

  private solicitations$: WritableSignal<any[]> = signal([]);

  constructor(
    private readonly apiSolicitationsService: ApiSolicitationsService
  ) {}

  public get solicitations(): any[] {
    let solicitations = this.solicitations$();
    if (!solicitations) {
      return [];
    }
    return solicitations;
  }

  public set solicitations(value: any[]) {
    this.solicitations$.set(value);
  }

  public get(): Observable<IEnvelopeArray<any>> {
    return this.apiSolicitationsService.get().pipe(
      map((res: IEnvelopeArray<any>) => {
        if (res?.items) {
          this.solicitations = res.items;
        }
        return res;
      })
    );
  }

  public create(data: any): Observable<IEnvelope<any>> {
    return this.apiSolicitationsService.create(data).pipe(
      map((res: IEnvelope<any>) => {
        if (res?.item) {
          this.solicitations = [...this.solicitations, res.item];
        }
        return res;
      })
    );
  }
}

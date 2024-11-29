import { Observable, map } from 'rxjs';
import { IEnvelope, IEnvelopeArray } from 'src/shared/utils/envelope';
import { ApiSolicitationsService } from '../../app/api/api-solicitations.service';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { ISolicitation } from './interfaces/i-solicitation';
import { NewSolicitationDto } from './dto/new-solicitation.dto';

@Injectable({
  providedIn: 'root',
})
export class SolicitationsService {

  private solicitations$: WritableSignal<ISolicitation[]> = signal([]);

  constructor(
    private readonly apiSolicitationsService: ApiSolicitationsService
  ) {}

  public get solicitations(): ISolicitation[] {
    let solicitations = this.solicitations$();
    if (!solicitations) {
      return [];
    }
    return solicitations;
  }

  public set solicitations(value: ISolicitation[]) {
    this.solicitations$.set(value);
  }

  public get(): Observable<IEnvelopeArray<ISolicitation>> {
    return this.apiSolicitationsService.get().pipe(
      map((res: IEnvelopeArray<ISolicitation>) => {
        if (res?.items) {
          this.solicitations = res.items;
        }
        return res;
      })
    );
  }

  public create(data: NewSolicitationDto): Observable<IEnvelope<ISolicitation>> {
    return this.apiSolicitationsService.create(data).pipe(
      map((res: IEnvelope<ISolicitation>) => {
        if (res?.item) {
          this.solicitations = [...this.solicitations, res.item];
        }
        return res;
      })
    );
  }
}

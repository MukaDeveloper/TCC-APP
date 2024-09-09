import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ApiAreasService } from 'src/app/api/api-areas.service';
import { IEnvelope, IEnvelopeArray } from 'src/shared/utils/envelope';
import { IArea } from './interfaces/i-area';

@Injectable({
  providedIn: 'root',
})
export class AreasService {
  // #region Properties (2)

  private areasSubject: BehaviorSubject<IArea[] | null>;

  public areas$: Observable<IArea[] | null>;

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor(private readonly apiAreasService: ApiAreasService) {
    this.areasSubject = new BehaviorSubject<IArea[] | null>([]);
    this.areas$ = this.areasSubject.asObservable();
  }

  public getAll(): Observable<IEnvelopeArray<IArea>> {
    return this.apiAreasService.getAll().pipe(
      map((res: IEnvelopeArray<IArea>) => {
        if (res?.items) {
          this.areasSubject.next(res.items);
        }
        return res;
      })
    );
  }

  public addNew(data: IArea): Observable<IEnvelope<IArea>> {
    return this.apiAreasService.newArea(data).pipe(
      map((res: IEnvelope<IArea>) => {
        if (res?.item) {
          const index = this.areasSubject.value?.findIndex((a) => a.id === res.item.id) as number;
          if (index >= 0 && this.areasSubject.value?.length) {
            this.areasSubject.value[index] = res.item;
          } else {
            this.areasSubject.next([res.item]);
          }
        }
        return res;
      })
    );
  }
}

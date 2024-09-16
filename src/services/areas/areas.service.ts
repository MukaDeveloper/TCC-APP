import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ApiAreasService } from 'src/app/api/api-areas.service';
import { IEnvelope, IEnvelopeArray } from 'src/shared/utils/envelope';
import { IArea } from './interfaces/i-area';

@Injectable({
  providedIn: 'root',
})
export class AreasService {
  // #region Properties (4)

  private areasSubject: BehaviorSubject<IArea[] | null>;
  private selectedAreaSubject: BehaviorSubject<IArea | null>;

  public areas$: Observable<IArea[] | null>;
  public selectedArea$: Observable<IArea | null>;

  // #endregion Properties (4)

  // #region Constructors (1)

  constructor(private readonly apiAreasService: ApiAreasService) {
    this.areasSubject = new BehaviorSubject<IArea[] | null>([]);
    this.areas$ = this.areasSubject.asObservable();
    this.selectedAreaSubject = new BehaviorSubject<IArea | null>(null);
    this.selectedArea$ = this.selectedAreaSubject.asObservable();
  }

  // #endregion Constructors (1)

  // #region Public Methods (3)

  public addNew(data: IArea): Observable<IEnvelope<IArea>> {
    return this.apiAreasService.newArea(data).pipe(
      map((res: IEnvelope<IArea>) => {
        if (res?.item) {
          this.selectedAreaSubject.next(res.item);
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

  public reset() {
    this.areasSubject.next(null);
    this.selectedAreaSubject.next(null);
  }

  // #endregion Public Methods (3)
}

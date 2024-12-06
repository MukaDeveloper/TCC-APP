import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ApiAreasService } from 'src/app/api/api-areas.service';
import { IEnvelope, IEnvelopeArray } from 'src/shared/utils/envelope';
import { IArea } from './interfaces/i-area';
import { NewAreaDto } from './dto/new-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Injectable({
  providedIn: 'root',
})
export class AreasService {
  // #region Properties (2)

  public areas$: BehaviorSubject<IArea[]> = new BehaviorSubject<IArea[]>([]);
  public selectedArea$: BehaviorSubject<IArea | null> =
    new BehaviorSubject<IArea | null>(null);

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor(private readonly apiAreasService: ApiAreasService) {}

  // #endregion Constructors (1)

  // #region Public Methods (5)

  public addNew(data: NewAreaDto): Observable<IEnvelope<IArea>> {
    return this.apiAreasService.newArea(data).pipe(
      map((res: IEnvelope<IArea>) => {
        if (res?.item) {
          this.selectedArea$.next(res.item);
          const index = this.areas$.value?.findIndex(
            (a) => a.id === res.item.id
          ) as number;
          if (index >= 0 && this.areas$.value?.length) {
            this.areas$.value[index] = res.item;
          } else {
            this.areas$.next([res.item]);
          }
        }
        return res;
      })
    );
  }

  public delete(areaId: number) {
    return this.apiAreasService
      .deleteArea(areaId)
      .pipe(map((res: null) => res));
  }

  public getAll(): Observable<IEnvelopeArray<IArea>> {
    return this.apiAreasService.getAll().pipe(
      map((res: IEnvelopeArray<IArea>) => {
        if (res?.items) {
          this.areas$.next(res.items);
        }
        return res;
      })
    );
  }

  public reset() {
    this.areas$.next([]);
    this.selectedArea$.next(null);
  }

  public updateArea(data: UpdateAreaDto): Observable<IEnvelope<IArea>> {
    return this.apiAreasService.updateArea(data).pipe(
      map((res: IEnvelope<IArea>) => {
        if (res?.item) {
          this.selectedArea$.next(res.item);
          const index = this.areas$.value?.findIndex(
            (a) => a.id === res.item.id
          ) as number;
          if (index >= 0 && this.areas$.value?.length) {
            this.areas$.value[index] = res.item;
          } else {
            this.areas$.next([res.item]);
          }
        }
        return res;
      })
    );
  }

  // #endregion Public Methods (5)
}

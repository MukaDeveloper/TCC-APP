import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ApiAreasService } from 'src/app/api/api-areas.service';
import { IEnvelope, IEnvelopeArray } from 'src/shared/utils/envelope';

@Injectable({
  providedIn: 'root',
})
export class AreasService {
  // #region Properties (2)

  private areasSubject: BehaviorSubject<any[] | null>;

  public areas$: Observable<any[] | null>;

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor(private readonly apiAreasService: ApiAreasService) {
    this.areasSubject = new BehaviorSubject<any[] | null>([]);
    this.areas$ = this.areasSubject.asObservable();
  }

  public getAll(): Observable<IEnvelopeArray<any>> {
    return this.apiAreasService.getAll().pipe(
      map((res: IEnvelopeArray<any>) => {
        if (res?.items) {
          this.areasSubject.next(res.items);
        }
        return res;
      })
    );
  }
}

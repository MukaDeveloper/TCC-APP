import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IEnvelope, IEnvelopeArray } from 'src/shared/utils/envelope';
import { ApiInstitutionService } from '../../app/api/api-institution.service';
import { IInstitution } from './interfaces/i-institution';

@Injectable({
  providedIn: 'root',
})
export class InstitutionService {
  // #region Properties (4)

  private institutionSubject: BehaviorSubject<IInstitution | null>;
  private institutionsSubject: BehaviorSubject<IInstitution[] | null>;

  public institution$: Observable<IInstitution | null>;
  public institutions$: Observable<IInstitution[] | null>;

  // #endregion Properties (4)

  // #region Constructors (1)

  constructor(private readonly apiInstitutionService: ApiInstitutionService) {
    this.institutionSubject = new BehaviorSubject<IInstitution | null>(null);
    this.institution$ = this.institutionSubject.asObservable();

    this.institutionsSubject = new BehaviorSubject<IInstitution[] | null>([]);
    this.institutions$ = this.institutionsSubject.asObservable();
  }

  // #endregion Constructors (1)

  // #region Public Getters And Setters (1)

  public get institution(): IInstitution | null {
    return this.institutionSubject.value;
  }

  // #endregion Public Getters And Setters (1)

  // #region Public Methods (3)

  public getAllByUser(): Observable<IEnvelopeArray<IInstitution>> {
    return this.apiInstitutionService.getAllByUser().pipe(
      map((res: IEnvelopeArray<IInstitution>) => {
        if (res?.items?.length) {
          console.log('[INSTITUTIONS]', res.items);
          this.institutionsSubject.next(res.items);
        }
        return res;
      })
    );
  }

  public getCurrent(): Observable<IEnvelope<IInstitution>> {
    return this.apiInstitutionService.getCurrent().pipe(
      map((res: IEnvelope<IInstitution>) => {
        if (res?.item) {
          console.log('[INSTITUTION]', res.item);
          this.institutionSubject.next(res.item);
        }
        return res;
      })
    );
  }

  public reset() {
    this.institutionSubject.next(null);
    this.institutionsSubject.next([]);
  }

  // #endregion Public Methods (3)
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApiMovimentationsService } from '../../app/api/api-movimentations.service';
import { IEnvelopeArray } from '../../shared/utils/envelope';
import { IMovimentations } from './interfaces/i-movimentations';

@Injectable({
  providedIn: 'root',
})
export class MovimentationsService {
  // #region Properties (4)

  private movimentationsFilteredSubject: BehaviorSubject<
    IMovimentations[] | null
  >;
  private movimentationsSubject: BehaviorSubject<IMovimentations[] | null>;

  public movimentations$: Observable<IMovimentations[] | null>;
  public movimentationsFiltered$: Observable<IMovimentations[] | null>;

  // #endregion Properties (4)

  // #region Constructors (1)

  constructor(
    private readonly apiMovimentationsService: ApiMovimentationsService
  ) {
    this.movimentationsSubject = new BehaviorSubject<IMovimentations[] | null>(
      []
    );
    this.movimentations$ = this.movimentationsSubject.asObservable();

    this.movimentationsFilteredSubject = new BehaviorSubject<
      IMovimentations[] | null
    >([]);
    this.movimentationsFiltered$ = this.movimentationsSubject.asObservable();
  }

  // #endregion Constructors (1)

  // #region Public Methods (2)

  public getAll(): Observable<IEnvelopeArray<IMovimentations>> {
    return this.apiMovimentationsService.getAll().pipe(
      map((res: IEnvelopeArray<IMovimentations>) => {
        if (res?.items?.length) {
          this.movimentationsSubject.next(res.items);
          if (!this.movimentationsFilteredSubject.value?.length) {
            this.movimentationsFilteredSubject.next(res.items);
          }
        }
        return res;
      })
    );
  }

  public reset() {
    this.movimentationsSubject.next(null);
    this.movimentationsFilteredSubject.next(null);
  }

  // #endregion Public Methods (2)
}

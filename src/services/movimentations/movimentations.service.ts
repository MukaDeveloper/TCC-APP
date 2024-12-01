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
    IMovimentations[]
  >;
  private movimentationsSubject: BehaviorSubject<IMovimentations[]>;

  public movimentations$: Observable<IMovimentations[]>;
  public movimentationsFiltered$: Observable<IMovimentations[]>;

  // #endregion Properties (4)

  // #region Constructors (1)

  constructor(
    private readonly apiMovimentationsService: ApiMovimentationsService
  ) {
    this.movimentationsSubject = new BehaviorSubject<IMovimentations[]>(
      []
    );
    this.movimentations$ = this.movimentationsSubject.asObservable();

    this.movimentationsFilteredSubject = new BehaviorSubject<
      IMovimentations[]
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
    this.movimentationsSubject.next([]);
    this.movimentationsFilteredSubject.next([]);
  }

  // #endregion Public Methods (2)
}

import {
  BehaviorSubject,
  Observable,
  Subscription,
  interval,
  map,
  of,
  startWith,
  switchMap,
  takeUntil,
  takeWhile,
} from 'rxjs';
import { IEnvelope, IEnvelopeArray } from 'src/shared/utils/envelope';
import { ApiSolicitationsService } from '../../app/api/api-solicitations.service';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { ISolicitation } from './interfaces/i-solicitation';
import { NewSolicitationDto } from './dto/new-solicitation.dto';
import { UpdateSolicitationDto } from './dto/update-solicitation.dto';

@Injectable({
  providedIn: 'root',
})
export class SolicitationsService {
  private solicitations$: WritableSignal<ISolicitation[]> = signal([]);
  private stopFetching$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private fetchingSubscription!: Subscription;

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

  public startFetch() {
    // console.log('stopFetching$ value:', this.stopFetching$.getValue());
    // console.log('startFetch');

    if (this.fetchingSubscription) {
      this.fetchingSubscription.unsubscribe();
    }

    this.fetchingSubscription = interval(5 * 60 * 1000) // Intervalo de 5 minutos
      .pipe(
        // takeUntil(this.stopFetching$),
        startWith(null),
        takeWhile(() => !this.stopFetching$.getValue(), true),
        switchMap(() => {
          // console.log('Making API request');
          return this.apiSolicitationsService.get();
        })
      )
      .subscribe({
        next: (res) => {
          // console.log('Solicitations GET API RES', res);
          if (res?.items) {
            this.solicitations = res.items;
          }
          return res;
        },
        error: (err) => console.error('Error fetching data', err),
        complete: () => console.log('startFetch => complete'),
      });
  }

  public stopFetching() {
    // console.log('solicitationsService > stopFetching');
    this.stopFetching$.next(true);
    if (this.fetchingSubscription) {
      this.fetchingSubscription.unsubscribe();
    }
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

  public create(
    data: NewSolicitationDto
  ): Observable<IEnvelope<ISolicitation>> {
    return this.apiSolicitationsService.create(data).pipe(
      map((res: IEnvelope<ISolicitation>) => {
        if (res?.item) {
          this.solicitations = [...this.solicitations, res.item];
        }
        return res;
      })
    );
  }

  public update(
    data: UpdateSolicitationDto
  ): Observable<IEnvelope<ISolicitation>> {
    return this.apiSolicitationsService.update(data).pipe(
      map((res: IEnvelope<ISolicitation>) => {
        if (res?.item) {
          const list = this.solicitations;
          const i = list.findIndex((x) => (x.id = res.item.id));
          if (i > -1) {
            list[i] = res.item;
            this.solicitations = list;
          }
        }
        return res;
      })
    );
  }

  public reset() {
    this.solicitations = [];
  }
}

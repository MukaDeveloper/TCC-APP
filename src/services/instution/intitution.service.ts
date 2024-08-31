import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ApiInstitutionService } from '../../app/api/api-institution.service';
import { IInstitution } from './interfaces/i-institution';

@Injectable({
  providedIn: 'root',
})
export class InstitutionService {
  // #region Properties (2)

  private institutionSubject: BehaviorSubject<IInstitution | null>;

  public institution$: Observable<IInstitution | null>;

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor(private readonly apiInstitutionService: ApiInstitutionService) {
    this.institutionSubject = new BehaviorSubject<IInstitution | null>(null);
    this.institution$ = this.institutionSubject.asObservable();
  }

  public getById(id: number): Observable<IInstitution> {
    return this.apiInstitutionService.getById(id).pipe(
      map((res: IInstitution) => {
        if (res) {
          this.institutionSubject.next(res);
        }
        return res;
      })
    );
  }
}

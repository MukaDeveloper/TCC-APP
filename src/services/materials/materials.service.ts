import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApiMaterialsService } from '../../app/api/api-materials.service';
import { IEnvelope, IEnvelopeArray } from '../../shared/utils/envelope';
import { IMaterial } from './interfaces/i-material';

@Injectable({
  providedIn: 'root',
})
export class MaterialsService {
  // #region Properties (4)

  public materials$: BehaviorSubject<IMaterial[] | null> = new BehaviorSubject<
    IMaterial[] | null
  >([]);
  public filtered$: BehaviorSubject<IMaterial[] | null> = new BehaviorSubject<
    IMaterial[] | null
  >([]);

  // #endregion Properties (4)

  // #region Constructors (1)

  constructor(private readonly apiMaterialsService: ApiMaterialsService) {}

  // #endregion Constructors (1)

  // #region Public Methods (2)

  public async getByIdAsync(materialId: number): Promise<IEnvelope<IMaterial>> {
    return this.apiMaterialsService.getByIdAsync(materialId);
  }

  public getAll(
    lastDocId: number,
    limit: number
  ): Observable<IEnvelopeArray<IMaterial>> {
    return this.apiMaterialsService.getAll(lastDocId, limit).pipe(
      map((res: IEnvelopeArray<IMaterial>) => {
        if (res?.items?.length) {
          this.materials$.next(res.items);
          this.filtered$.next(res.items);
        }
        return res;
      })
    );
  }

  public reset() {
    this.materials$.next(null);
    this.filtered$.next(null);
  }

  // #endregion Public Methods (2)
}

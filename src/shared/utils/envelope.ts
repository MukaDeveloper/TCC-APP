// #region Interfaces (2)

export interface IEnvelope<T> {
  // #region Properties (1)

  item: T;

  // #endregion Properties (1)
}

export interface IEnvelopeArray<T> {
  // #region Properties (6)

  actives?: number;
  items: T[];
  itemsTotal: number;
  limit: number;
  offSet: number;
  total: number;

  // #endregion Properties (6)
}

// #endregion Interfaces (2)

// #region Functions (3)

export function factoryEnvelope<T>(data: T | null) {
  return {
    item: data || null,
  };
}

export function factoryEnvelopeArray<T>(items?: T[]) {
  if (!items) {
    items = [];
  }
  const data = {} as IEnvelopeArray<T>;
  data.offSet = 0;
  data.limit = 0;
  data.itemsTotal = items.length;
  data.total = items.length;
  data.items = items;
  return data;
}

export function factoryEnvelopeArrayPagination<T>(
  items: T[],
  offset: number,
  limit: number,
  total?: number
) {
  const data = {} as IEnvelopeArray<T>;
  data.offSet = offset;
  data.limit = limit;
  data.itemsTotal = items.length;
  data.total = total || items.length;
  data.items = items;
  return data;
}

// #endregion Functions (3)

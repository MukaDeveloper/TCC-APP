export interface IEnvelope<T> {
  item: T;
}

export interface IEnvelopeArray<T> {
  actives?: number;
  offSet: number;
  limit: number;
  itemsTotal: number;
  total: number;
  items: T[];
}

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

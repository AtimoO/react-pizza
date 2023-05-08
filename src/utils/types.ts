export interface IPizza {
  id: string,
  imageUrl: string,
  title: string,
  types: Array<number>,
  sizes: Array<number>,
  price: number,
  category: number,
  rating: number
}

export interface ICartItem {
  id: string;
  imageUrl: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
}

type sortProperty = 'rating' | 'price' | 'title';

export interface ISortType {
  name: 'популярности' | 'цене' | 'алфавиту',
  sortProperty: sortProperty,
}

export type RequestStatus = 'loading' | 'success' | 'error';

export interface IFilter {
  category: number,
  page: number,
  sortBy: ISortType,
  order: string,
}

export interface IFetchPizzas {
  currentPage: number,
  showLimitPizzas: number,
  urlSearch: string,
  urlCategory: string,
  sortProperty: sortProperty,
  sortRanking: string,
}

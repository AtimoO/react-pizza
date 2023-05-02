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
  type: number;
  size: number;
  price: number;
  count: number;
}

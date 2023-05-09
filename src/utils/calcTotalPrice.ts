import { ICartItem } from "./types";

export const calcTotalPrice = (items: Array<ICartItem>) => {
  return items.reduce((prev, curr) => prev + curr.price * curr.count, 0);
}

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICartItem } from '../../utils/types';
import { RootState } from '../store';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

export interface ICartSliceState {
  totalPrice: number,
  items: Array<ICartItem>
}

const initialState: ICartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Array<ICartItem>>) {
      state.items = action.payload;

      state.totalPrice = calcTotalPrice(state.items);
    },
    addItem(state, actions: PayloadAction<ICartItem>) {
      const findItem = state.items.find(
        (item) => item.id === actions.payload.id,
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...actions.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, actions: PayloadAction<string>) {
      const findItem = state.items.find((item) => item.id === actions.payload);
      if (findItem && findItem.count > 1) {
        findItem.count--;
      } else {
        state.items = state.items.filter((item) => item.id !== actions.payload);
        if (state.items) {
          localStorage.removeItem('cart');
        }
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, actions: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== actions.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      localStorage.removeItem('cart');
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id);

export const { setItems, addItem, minusItem, clearItems, removeItem } = cartSlice.actions;

export default cartSlice.reducer;

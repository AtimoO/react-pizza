import { createSlice } from '@reduxjs/toolkit';
import { ICartItem } from '../../utils/types';

interface ICartSliceState {
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
    addItem(state, actions) {
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
      state.totalPrice = state.items.reduce((prev, curr) => {
        return prev + curr.price * curr.count;
      }, 0);
    },
    minusItem(state, actions) {
      const findItem = state.items.find((item) => item.id === actions.payload);
      if (findItem && findItem.count > 1) {
        findItem.count--;
      } else {
        state.items = state.items.filter((item) => item.id !== actions.payload);
      }
      state.totalPrice = state.items.reduce((prev, curr) => {
        return prev + curr.price * curr.count;
      }, 0);
    },
    removeItem(state, actions) {
      state.items = state.items.filter((item) => item.id !== actions.payload);
      state.totalPrice = state.items.reduce((prev, curr) => {
        return prev + curr.price * curr.count;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id: string) => (state) =>
  state.cart.items.find((item) => item.id === id);

export const { addItem, minusItem, clearItems, removeItem } = cartSlice.actions;

export default cartSlice.reducer;

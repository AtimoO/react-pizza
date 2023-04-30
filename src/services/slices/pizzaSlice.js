import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchItems',
  async (params, thunkApi) => {
    // thunkApi - позволяет использовать внутри этой ф-ии dispatch - не только этого слайса, но и других
    // можно узнать предыдуший стейт до выполнения thunkApi.getState();
    // можно остановить запрос с помощью abort...и signal
    const {
      currnetPage,
      showLimitPizzas,
      urlSearch,
      urlCategory,
      sortProperty,
      sortRanking,
    } = params;
    const { data } = await axios.get(
      `https://642008d025cb657210411d98.mockapi.io/items?page=${currnetPage}&limit=${showLimitPizzas}&${urlSearch}${urlCategory}sortBy=${sortProperty}&order=${sortRanking}`,
    );
    return data;
  },
);

const initialState = {
  items: [],
  status: 'loading', // load | success | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, actions) {
      state.items = actions.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const selectPizza = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

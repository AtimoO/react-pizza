import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IFetchPizzas, IPizza, RequestStatus } from '../../utils/types';

interface IPizzaSliceState {
  items: Array<IPizza>,
  status: RequestStatus
}

export const fetchPizzas = createAsyncThunk<Array<IPizza>, IFetchPizzas>(
  'pizzas/fetchItems',
  async (params) => {
    // thunkApi - позволяет использовать внутри этой ф-ии dispatch - не только этого слайса, но и других
    // можно узнать предыдуший стейт до выполнения thunkApi.getState();
    // можно остановить запрос с помощью abort...и signal
    const {
      currentPage,
      showLimitPizzas,
      urlSearch,
      urlCategory,
      sortProperty,
      sortRanking,
    } = params;
    const { data } = await axios.get<Array<IPizza>>(
      `https://642008d025cb657210411d98.mockapi.io/items?page=${currentPage}&limit=${showLimitPizzas}&${urlSearch}${urlCategory}sortBy=${sortProperty}&order=${sortRanking}`,
    );
    return data;
  },
);

const initialState: IPizzaSliceState = {
  items: [],
  status: 'loading', // load | success | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, actions: PayloadAction<Array<IPizza>>) {
      state.items = actions.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  }
});

export const selectPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

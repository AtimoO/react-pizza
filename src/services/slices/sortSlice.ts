import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IFilter, ISortType } from '../../utils/types';

interface ICartSliceState {
  searchValue: string,
  categoryId: number,
  currentPage: number,
  sortType: ISortType,
  sortRanking: string,
}



const initialState: ICartSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sortType: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  sortRanking: 'asc',
};

const sortSlice = createSlice({
  name: 'sorts',
  initialState,
  reducers: {
    setSearchValue(state, actions: PayloadAction<string>) {
      state.searchValue = actions.payload;
    },
    setCategory(state, actions: PayloadAction<number>) {
      state.categoryId = actions.payload;
    },
    setSortRanking(state, actions: PayloadAction<string>) {
      state.sortRanking = actions.payload;
    },
    setSortType(state, actions: PayloadAction<ISortType>) {
      state.sortType = actions.payload;
    },
    setPageCount(state, actions: PayloadAction<number>) {
      state.currentPage = actions.payload;
    },
    setFilters(state, actions: PayloadAction<IFilter>) {
      state.categoryId = Number(actions.payload.category);
      state.currentPage = Number(actions.payload.page);
      state.sortType = actions.payload.sortBy;
      state.sortRanking = String(actions.payload.order);
    },
  },
});

export const selectSort = (state: RootState) => state.sort;

export const {
  setCategory,
  setSortRanking,
  setSortType,
  setPageCount,
  setFilters,
  setSearchValue,
} = sortSlice.actions;

export default sortSlice.reducer;

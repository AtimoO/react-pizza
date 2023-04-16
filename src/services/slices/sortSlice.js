import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currnetPage: 1,
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
    setCategory(state, actions) {
      state.categoryId = actions.payload;
    },
    setSortRanking(state, actions) {
      state.sortRanking = actions.payload;
    },
    setSortType(state, actions) {
      state.sortType = actions.payload;
    },
    setPageCount(state, actions) {
      state.currnetPage = actions.payload;
    },
    setFilters(state, actions) {
      state.categoryId = Number(actions.payload.category);
      state.currnetPage = Number(actions.payload.page);
      state.sortType = actions.payload.sortBy;
      state.sortRanking = actions.payload.order;
    },
  },
});

export const {
  setCategory,
  setSortRanking,
  setSortType,
  setPageCount,
  setFilters,
} = sortSlice.actions;

export default sortSlice.reducer;

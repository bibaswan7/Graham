// features/searchQuerySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const searchQuerySlice = createSlice({
  name: 'searchQuery',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      return action.payload;
    },
    clearSearchQuery: () => {
      return ''; // Return an empty string to clear the search query
    }
  },
});

export const { setSearchQuery, clearSearchQuery } = searchQuerySlice.actions;

export default searchQuerySlice.reducer;

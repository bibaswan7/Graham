// features/imagesDataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const imagesDataSlice = createSlice({
  name: 'imagesData',
  initialState,
  reducers: {
    setImagesData: (state, action) => {
      return action.payload;
    },
    
  },
});

export const { setImagesData,clearImagesData } = imagesDataSlice.actions;

export default imagesDataSlice.reducer;

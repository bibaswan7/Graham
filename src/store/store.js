import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import imagesDataReducer from "../features/imagesDataSlice";
import searchQueryReducer from "../features/searchQuerySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    imagesData: imagesDataReducer,
    searchQuery: searchQueryReducer,
  },
});

export default store;

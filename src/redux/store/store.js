import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import modalReducer from "../slices/modalSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

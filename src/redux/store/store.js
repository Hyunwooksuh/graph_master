import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import modalReducer from "../slices/modalSlice";
import problemReducer from "../slices/problemSlice";
import debuggingReducer from "../slices/debuggingSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    problem: problemReducer,
    debug: debuggingReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

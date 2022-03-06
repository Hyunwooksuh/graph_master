import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import modalReducer from "../slices/modalSlice";
import problemReducer from "../slices/problemSlice";
import debuggingReducer from "../slices/debuggingSlice";
import scopeReducer from "../slices/scopeSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    problem: problemReducer,
    debug: debuggingReducer,
    scope: scopeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

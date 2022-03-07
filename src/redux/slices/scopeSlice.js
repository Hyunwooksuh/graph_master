import { createSlice } from "@reduxjs/toolkit";
import { original } from "immer";

const scopeSlices = createSlice({
  name: "scope",
  initialState: {
    currentScope: [],
    scopeArray: [],
    scopeHistory: [],
    serializedText: null,
    stepCount: -1,
    didClickPrev: false,
  },
  reducers: {
    setScopeProperties: (state, action) => {
      state.scopeHistory.push(action.payload);
      state.scopeArray.push(action.payload.scope);
      state.currentScope = [action.payload.scope, action.payload.properties];
    },
    setSerializedText: (state, action) => {
      state.serializedText = action.payload;
      state.stepCount += 1;
    },
    decrementStepCount: (state, action) => {
      state.stepCount -= 1;
    },
    incrementStepCount: (state, action) => {
      state.stepCount += 1;
    },
    setCurrentScope: (state, action) => {
      const scopeInfo = original(state.scopeHistory[state.stepCount]);
      state.currentScope = [scopeInfo.scope, scopeInfo.properties];
    },
    setDidClickPrev: (state, action) => {
      state.didClickPrev = !state.didClickPrev;
    },
  },
});

export const {
  setScopeProperties,
  setSerializedText,
  decrementStepCount,
  incrementStepCount,
  setCurrentScope,
  setDidClickPrev,
} = scopeSlices.actions;
export default scopeSlices.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { original } from "immer";

const scopeSlices = createSlice({
  name: "scope",
  initialState: {
    currentScope: [],
    currentOutput: null,
    scopeArray: [],
    scopeHistory: [],
    outputHistory: [],
    serializedText: null,
    stepCount: -1,
    didClickPrev: false,
  },
  reducers: {
    setScopeProperties: (state, action) => {
      state.scopeHistory.push(action.payload);
      state.scopeArray.push(action.payload.scope);
      state.currentScope = [action.payload.scope, action.payload.properties];

      if (action.payload.output === "BlockStatement" && state.stepCount >= 0) {
        state.outputHistory.push(state.outputHistory[state.outputHistory.length - 1]);
      } else {
        state.currentOutput = action.payload.output;
        state.outputHistory.push(state.currentOutput);
      }
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
    setCurrentOutput: (state, action) => {
      if (state.stepCount < 0) {
        state.currentOutput = null;
        return;
      }

      if (!state.outputHistory[state.stepCount]) {
        state.currentOutput = null;
      } else {
        state.currentOutput = original(state.outputHistory[state.stepCount]);
      }
    },
    setCurrentScope: (state, action) => {
      if (state.stepCount < 0) {
        state.currentScope = [];
        return;
      }

      const scopeInfo = original(state.scopeHistory[state.stepCount]);
      state.currentScope = [scopeInfo.scope, scopeInfo.properties];
    },
    setDidClickPrev: (state, action) => {
      state.didClickPrev = action.payload;
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
  setCurrentOutput,
  setReset,
} = scopeSlices.actions;
export default scopeSlices.reducer;

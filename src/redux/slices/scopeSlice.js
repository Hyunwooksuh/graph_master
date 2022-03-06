import { createSlice } from "@reduxjs/toolkit";

const scopeSlices = createSlice({
  name: "scope",
  initialState: {
    serializedText: null,
    currentScope: null,
  },
  reducers: {
    setScopeProperties: (state, action) => {
      state[action.payload.scope] = action.payload.properties;
      state.currentScope = [action.payload.scope, action.payload.properties];
    },
    setSerializedText: (state, action) => {
      state.serializedText = action.payload;
    },
  },
});

export const { setScopeProperties, setSerializedText } = scopeSlices.actions;
export default scopeSlices.reducer;

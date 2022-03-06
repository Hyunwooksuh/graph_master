import { createSlice } from "@reduxjs/toolkit";

const scopeSlices = createSlice({
  name: "scope",
  initialState: {},
  reducers: {
    setScopeProperties: (state, action) => {
      state[action.payload.scope] = action.payload.properties;
    },
  },
});

export const { setScopeProperties } = scopeSlices.actions;
export default scopeSlices.reducer;

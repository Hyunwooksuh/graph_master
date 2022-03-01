import { createSlice } from "@reduxjs/toolkit";

const debuggingSlices = createSlice({
  name: "modal",
  initialState: {
    isDebugging: false,
  },
  reducers: {
    setIsDebugging: (state, action) => {
      state.isDebugging = !state.isDebugging;
    },
  },
});

export const { setIsDebugging } = debuggingSlices.actions;
export default debuggingSlices.reducer;

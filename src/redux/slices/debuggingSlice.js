import { createSlice } from "@reduxjs/toolkit";

const debuggingSlices = createSlice({
  name: "debug",
  initialState: {
    isDebugging: false,
    nodeHistory: [],
    currentNodeCount: 0,
  },
  reducers: {
    setIsDebugging: (state, action) => {
      state.isDebugging = action.payload.status;
    },
    insertCurrentNode: (state, action) => {
      state.currentNodeCount += 1;
      state.nodeHistory.push(action.payload);
    },
  },
});

export const { setIsDebugging } = debuggingSlices.actions;
export default debuggingSlices.reducer;

import { createSlice } from "@reduxjs/toolkit";

const problemSlices = createSlice({
  name: "problem",
  initialState: {
    currentProblem: null,
  },
  reducers: {
    setProblem: (state, action) => {
      state.currentProblem = action.payload;
    },
  },
});

export const { setProblem, submitCode } = problemSlices.actions;
export default problemSlices.reducer;

import { createSlice } from "@reduxjs/toolkit";

const problemSlices = createSlice({
  name: "modal",
  initialState: {
    currentProblem: null,
  },
  reducers: {
    setProblem: (state, action) => {
      state.currentProblem = action.payload;
    },
  },
});

export const { setProblem } = problemSlices.actions;
export default problemSlices.reducer;

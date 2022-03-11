import { createSlice } from "@reduxjs/toolkit";

const problemSlices = createSlice({
  name: "problem",
  initialState: {
    currentProblem: null,
    submittedCode: "",
    currentKind: null,
  },
  reducers: {
    setProblem: (state, action) => {
      state.currentProblem = action.payload.traversal;
      state.currentKind = action.payload.kind;
    },
    setSubmittedCode: (state, action) => {
      state.submittedCode = action.payload;
    },
  },
});

export const { setProblem, setSubmittedCode } = problemSlices.actions;
export default problemSlices.reducer;

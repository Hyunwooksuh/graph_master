import { createSlice } from "@reduxjs/toolkit";

const problemSlices = createSlice({
  name: "problem",
  initialState: {
    currentProblem: null,
    submittedCode: "",
    currentKind: null,
    onPathVisualize: false,
  },
  reducers: {
    setProblem: (state, action) => {
      state.currentProblem = action.payload.traversal;
      state.currentKind = action.payload.kind;
    },
    setSubmittedCode: (state, action) => {
      state.submittedCode = action.payload;
    },
    togglePathVisualize: (state, action) => {
      state.onPathVisualize = action.payload;
    },
  },
});

export const { setProblem, setSubmittedCode, togglePathVisualize } = problemSlices.actions;
export default problemSlices.reducer;

import { createSlice } from "@reduxjs/toolkit";

const modalSlices = createSlice({
  name: "modal",
  initialState: {
    isOpen: true,
    currentModal: "Tutorial",
    objective: null,
    error: null,
    group: null,
  },
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = !state.isOpen;
      state.currentModal = action.payload;
    },
    setObjective: (state, action) => {
      state.objective = action.payload.case;
      state.group = action.payload.group;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setIsOpen, setObjective, setError } = modalSlices.actions;
export default modalSlices.reducer;

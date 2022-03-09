import { createSlice } from "@reduxjs/toolkit";

const modalSlices = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    currentModal: null,
    objective: null,
    error: null,
  },
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = !state.isOpen;
      state.currentModal = action.payload;
    },
    setObjective: (state, action) => {
      state.objective = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setIsOpen, setObjective, setError } = modalSlices.actions;
export default modalSlices.reducer;

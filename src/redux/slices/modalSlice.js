import { createSlice } from "@reduxjs/toolkit";

const modalSlices = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    currentModal: null,
  },
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = !state.isOpen;
      state.currentModal = action.payload;
    },
  },
});

export const { setIsOpen } = modalSlices.actions;
export default modalSlices.reducer;

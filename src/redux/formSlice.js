import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    data: null,
  },
  reducers: {
    submitForm: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { submitForm } = formSlice.actions;
export default formSlice.reducer;

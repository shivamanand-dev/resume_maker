import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  access: "Public",
  userDetails: [],
};

export const reduxStoreSlice = createSlice({
  name: "reduxStore",
  initialState: {
    userDetails: [],
  },

  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUserDetails } = reduxStoreSlice.actions;

export const editorStates = (state) => state.editor;

export default reduxStoreSlice.reducer;

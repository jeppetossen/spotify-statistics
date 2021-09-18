import { createSlice } from "@reduxjs/toolkit";

const logout = createSlice({
  name: "logout",
  initialState: '',
  reducers: {
    resetStore: state => {}
  },
});

export const { resetStore } = logout.actions;
export default logout;

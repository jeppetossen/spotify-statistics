import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  accessToken: '' as string,
};

const logout = createSlice({
  name: "logout",
  initialState: initialState,
  reducers: {
    resetStore: state => {}
  },
});

export const { resetStore } = logout.actions;
export default logout;

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../../lib/store";


const initialState = {
  limit: 10 as number,
};

const limit = createSlice({
  name: "limit",
  initialState: initialState,
  reducers: {
    setLimit: (state, action) => {
      return {
        ...state,
        limit: action.payload,
      };
    },
  },
});

export const selectLimit = (state: RootState) => state.limit.limit;
export const { setLimit } = limit.actions;
export default limit;

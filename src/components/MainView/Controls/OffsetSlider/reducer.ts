import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../../lib/store";


const initialState = {
  offset: 0 as number,
};

const offset = createSlice({
  name: "offset",
  initialState: initialState,
  reducers: {
    setOffset: (state, action) => {
      return {
        ...state,
        offset: action.payload,
      };
    },
  },
});

export const selectOffset = (state: RootState) => state.offset.offset;
export const { setOffset } = offset.actions;
export default offset;

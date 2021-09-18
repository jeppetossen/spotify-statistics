import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../../lib/store";


const initialState = {
  timeRange: "short_term" as string,
};

const timeRange = createSlice({
  name: "timeRange",
  initialState: initialState,
  reducers: {
    setTimeRange: (state, action) => {
      state.timeRange = action.payload;
    },
  },
});

export const selectTimeRange = (state: RootState) => state.timeRange.timeRange;
export const { setTimeRange } = timeRange.actions;
export default timeRange;

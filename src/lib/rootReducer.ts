import { combineReducers } from "redux";
import { removeCookie } from "../spotify/spotify";
import timeRange from "../components/MainView/Controls/TimeRange/reducer";
import limit from "../components/MainView/Controls/LimitSlider/reducer";
import offset from "../components/MainView/Controls/OffsetSlider/reducer";


const combineReducer = combineReducers({
  timeRange: timeRange.reducer,
  limit: limit.reducer,
  offset: offset.reducer,
});

const rootReducer = (state: any, action: any)=> {
  if (action.type === "logout/resetStore") {
    state = undefined;
    removeCookie();
    window.location.href = '/';
  }

  return combineReducer(state, action);
}

export default rootReducer;

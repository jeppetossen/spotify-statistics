import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const middleware = process.env.NODE_ENV === 'development' ?
  [require('redux-immutable-state-invariant').default()] : [];

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware =>
    getDefaultMiddleware().concat(...middleware)
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

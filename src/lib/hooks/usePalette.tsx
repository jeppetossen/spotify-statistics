import React from "react";
import { getPalette } from "../colors/getPalette";

export type PaletteState = {
  isLoading: boolean;
  error?: Error;
  palette: { [key: string]: string };
};

const initialState: PaletteState = {
  isLoading: true,
  palette: {average: "rgb(0,0,0)"},
  error: undefined
};

const reducer = (state: PaletteState, action: any): PaletteState => {
  switch (action.type) {
    case "getPalette":
      return initialState;
    case "resolvePalette":
      return {...state, palette: action.payload, isLoading: false};
    case "rejectPalette":
      return {...state, error: action.payload, isLoading: false}
    default:
      return {...state, isLoading: false}
  }
};

export const usePalette = (src: string) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    dispatch({type: "getPalette"});

    getPalette(src)
      .then(palette => {
        dispatch({type: "resolvePalette", payload: palette});
      })
      .catch(e => {
        dispatch({type: "rejectPalette", payload: e});
      });
  }, [src]);

  return state;
};

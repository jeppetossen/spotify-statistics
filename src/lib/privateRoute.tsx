import React from "react";
import { Redirect, Route } from "react-router-dom";

import { IPrivateRouteProps } from "./types";
import { getCookie } from "../spotify/spotify";


export const PrivateRoute = ({children, ...rest}: IPrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={({location}) =>
        getCookie() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {from: location},
            }}
          />
        )
      }
    />
  );
};

import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import Login from "./components/Login";
import { PrivateRoute } from "./lib/privateRoute";
import TopTracks from "./components/TopLists/Tracks";
import TopArtists from "./components/TopLists/Artists";
import { getAccessToken } from "./spotify/spotify";
import { createTheme } from "@material-ui/core";
import { IThemeOptions } from "./lib/types";

const theme = createTheme({
  palette: {
    themePrimary: {
      backgroundColor: "rgb(0, 184, 113)",
      trimColor: "rgb(145, 124, 120)",
      lightTextColor: "rgb(229, 234, 215)",
      darkTextColor: "rgb(4, 7, 16)",
    },
    themeSecondary: {
      backgroundColor: "rgb(68, 156, 118)",
      trimColor: "rgb(183, 148, 146)",
      lightTextColor: "rgb(224, 224, 204)",
      darkTextColor: "rgb(27, 30, 38)",
    },
  },
} as IThemeOptions);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            {getAccessToken() ? <Redirect to="/stats/tracks"/> : <Login/>}
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <PrivateRoute path="/stats/tracks">
            <TopTracks/>
          </PrivateRoute>
          <PrivateRoute path="/stats/artists">
            <TopArtists/>
          </PrivateRoute>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};


export default App;

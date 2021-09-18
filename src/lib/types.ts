import { ReactChild, ReactChildren } from "react";
import { Palette } from "@material-ui/core/styles/createPalette";
import { Theme } from "@material-ui/core/styles";
import { ThemeOptions } from "@material-ui/core";

export interface IChildrenProps {
  children: ReactChild | ReactChildren;
}

export interface IPrivateRouteProps extends IChildrenProps{
  exact?: boolean;
  path: string;
}

interface IPalette extends Palette {
  themePrimary: {
    backgroundColor: string,
    trimColor: string,
    lightTextColor: string,
    darkTextColor: string,
  },
  themeSecondary: {
    backgroundColor: string,
    trimColor: string,
    lightTextColor: string,
    darkTextColor: string,
  },
}

export interface ITheme extends Theme {
  palette: IPalette;
}

export interface IThemeOptions extends ThemeOptions {
  palette: IPalette;
}

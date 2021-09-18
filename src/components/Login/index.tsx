import React from "react";
import urls from "../../utils/urls";
import { Box, Button, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ITheme } from "../../lib/types";


const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "60vh",
    },
    title: {
      fontWeight: "bold",
      color: theme.palette.themePrimary.darkTextColor,
    },
    button: {
      marginTop: 64,
      color: theme.palette.themePrimary.darkTextColor,
      backgroundColor: theme.palette.themeSecondary.backgroundColor,
      "&:hover": {
        backgroundColor: theme.palette.themePrimary.backgroundColor,
      },
    },
  }),
);

const Login = () => {
  const classes = useStyles();

  const clientId = "08229ccf0cc24b99b8d855af166bec00";
  const redirectUri = urls.redirect;
  const authEndpoint = urls.authEndpoint;

  const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`;

  return (
    <div className={classes.root}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography
          variant="h2"
          className={classes.title}
        >
          Spotify Statistics
        </Typography>
        <Button
          size="large"
          variant="outlined"
          href={authUrl}
          className={classes.button}
        >
          Login with Spotify
        </Button>
      </Box>
    </div>
  );
};

export default Login;

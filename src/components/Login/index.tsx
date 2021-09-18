import React from "react";
import urls from "../../utils/urls";
import { Box, Button, Typography } from "@material-ui/core";


const Login = () => {
  const clientId = "08229ccf0cc24b99b8d855af166bec00";
  const redirectUri = urls.redirect;
  const authEndpoint = urls.authEndpoint;

  const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`;

  return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography
          variant="h2"
          style={{ textAlign: "center", fontWeight: "bold" }}
        >
          Spotify Statistics
        </Typography>
        <Button
          size="large"
          variant="outlined"
          href={authUrl}
        >
          Login with Spotify
        </Button>
      </Box>
  );
};

export default Login;

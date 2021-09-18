import React from "react";
import { Box, createStyles, Divider, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "../Sidebar";
import Controls from "./Controls";
import { ITheme } from "../../lib/types";


const contentWidth = 384;
const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      maxWidth: `calc(100% - ${contentWidth}px)`,
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
    chartParent: {
      display: "flex",
      flexDirection: "row",
      height: 384,
    },
  }),
);

const MainView = ({children}: any) => {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <Sidebar/>
        <main className={classes.content}>
          <div className={classes.toolbar}/>
          <Grid container spacing={2} direction="column">
            <Controls/>
            <Divider className={classes.divider}/>
            <Grid item container alignItems="center" justifyContent="center">
              <Box className={classes.chartParent}>
                {children}
              </Box>
            </Grid>
          </Grid>
        </main>
      </div>
  );
};

export default MainView;

import React from "react";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Audiotrack } from "@material-ui/icons";
import PersonIcon from "@material-ui/icons/Person";
import { Button } from "@material-ui/core";
import { useAppDispatch } from "../../lib/hooks/reduxHooks";
import { resetStore } from "../../spotify/reducer";
import { ITheme } from "../../lib/types";
import { NavLink } from "react-router-dom";


const drawerWidth = 160;
const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: theme.palette.themePrimary.backgroundColor,
      color: theme.palette.themePrimary.darkTextColor,

    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      borderRight: 1,
      borderRightColor: theme.palette.themePrimary.trimColor,
      borderRightStyle: "solid",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    title: {
      flexGrow: 1,
    },
    listItem: {
      margin: "auto",
      textDecorationLine: "none",
      transition: theme.transitions.create("background-color", {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shortest,
      }),
      "&.active": {
        backgroundColor: theme.palette.themeSecondary.backgroundColor,
      },
      "&:hover": {
        backgroundColor: theme.palette.themePrimary.backgroundColor,
      },
    },
    list: {
      padding: 0,
    },
  }),
);

const Sidebar = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleLogout = (event: any) => {
    dispatch(resetStore());
  };

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Spotify Statistics
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{paper: classes.drawerPaper}}
      >
        <Toolbar/>
        <List className={classes.list}>
          <SidebarItems/>
        </List>
      </Drawer>
    </div>
  );
};

interface IItems {
  readonly [key: string]: JSX.Element
}

const SidebarItems = () => {
  const classes = useStyles();

  const items: IItems = {
    "tracks": <Audiotrack/>,
    "artists": <PersonIcon/>,
  };

  const listItemText = (key: string) => {
    return key.charAt(0).toUpperCase() + key.slice(1);
  };

  return (
    <>
      {Object.keys(items).map((key: string) => {
        return (
          <ListItem button component={NavLink} to={`/stats/${key}`} key={key} className={classes.listItem}>
            <ListItemIcon>
              {items[key]}
            </ListItemIcon>
            <ListItemText primary={listItemText(key)}/>
          </ListItem>
        )
      })}
    </>
  );
};

export default Sidebar;

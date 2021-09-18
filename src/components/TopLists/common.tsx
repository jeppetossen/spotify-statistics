import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Grid, ListItemText, Paper, Typography } from "@material-ui/core";
import { usePalette } from "../../lib/hooks/usePalette";
import { FixedSizeList } from "react-window";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: 'hidden',
      height: 550,
    },
    paper: {
      display: "flex",
      flexDirection: "row",
      width: 500,
      margin: "auto",
      padding: theme.spacing(2),
    },
    image: {
      width: 64,
      height: 64,
      margin: "0 0 0 24px"
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
    avatar: {
      margin: "0 4px 0 8px"
    },
    item: {
      padding: "0 8px",
    },
    rank: {
      margin: "auto",
      display: "block",
      width: "100%",
      maxWidth: "2rem",
    },
  }),
);

const itemStyle = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      padding: "0 8px",
      backgroundColor: (props: any) => props.backgroundColor
    },
  })
)

const TopList = ({data}: any): JSX.Element => {

  return (
    <>
      <FixedSizeList
        height={550}
        layout="vertical"
        width={500}
        itemCount={data.length}
        itemSize={110}
        itemData={data}
      >
        {Row}
      </FixedSizeList>
    </>
  );
};

const Row = ({data, style, index}: any) => {

  const img = data[index].image.url;
  const trackName = (data[0].info.type === "tracks") ? data[index].info.name : undefined;
  const artistName = (data[0].info.type === "artists") ? data[index].info.name : data[index].artists[0].name;
  const imgAlt = (trackName === undefined) ? artistName : trackName;
  const id = data[index].info.id;

  const {palette, isLoading, error} = usePalette(img);
  let backgroundColor = 'rgb(' + palette.average[0] + ', ' + palette.average[1] + ', ' + palette.average[2] + ')';

  const classes = useStyles();
  const listItemClass = itemStyle({backgroundColor: backgroundColor});

  // TODO: handle error from retrieving color palette
  if (error) {
    //
  }

  if (isLoading) {
    return (
      <ListItem className={listItemClass.item} style={style} key={id}>
        Loading...
      </ListItem>
    )
  }

  return (
    <ListItem className={listItemClass.item} style={style} key={id}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs className={classes.rank}>
            <Typography variant="body2" style={{fontSize: 18}}>
              {index + 1}
            </Typography>
          </Grid>

          <Grid item className={classes.img}>
            <ListItemAvatar>
              <Avatar>
                <img
                  src={img}
                  alt={imgAlt}
                />
              </Avatar>
            </ListItemAvatar>
          </Grid>

          <Grid item xs>
            {trackName ?
              <ListItemText primary={trackName} secondary={artistName}/>
              : <ListItemText primary={artistName}/>
            }
          </Grid>
        </Grid>
      </Paper>
    </ListItem>
  );
};

export default TopList;

import React from "react";
import { Grid, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";
import { selectTimeRange, setTimeRange } from "./reducer";
import { useAppDispatch, useAppSelector } from "../../../../lib/hooks/reduxHooks";

const useStyles = makeStyles({
  gridItem: {
    width: 150,
  },
});

const TimeRange = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const timeRange = useAppSelector(selectTimeRange);

  return (
    <Grid item className={classes.gridItem}>
      <InputLabel id="time-range-label">Time range</InputLabel>
      <Select
        labelId="time-range-label"
        id="time-range-select"
        value={timeRange}
        onChange={event => dispatch(setTimeRange(event.target.value))}
      >
        <MenuItem value={"short_term"}>Past month</MenuItem>
        <MenuItem value={"medium_term"}>Past 6 month</MenuItem>
        <MenuItem value={"long_term"}>All time</MenuItem>
      </Select>
    </Grid>
  );
};

export default TimeRange;

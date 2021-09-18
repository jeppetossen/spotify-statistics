import React from "react";
import { Grid } from "@material-ui/core";
import TimeRange from "./TimeRange";
import LimitSlider from "./LimitSlider";
import OffsetSlider from "./OffsetSlider";


const Controls = () => {
  return (
    <Grid item container spacing={4} direction="row" alignItems="center" justifyContent="center">
      <TimeRange/>
      <LimitSlider/>
      <OffsetSlider/>
    </Grid>
  )
};

export default Controls;

import React, { ChangeEvent, useState } from "react";
import { Grid, makeStyles, Slider, Typography } from "@material-ui/core";
import { useAppDispatch } from "../../../../lib/hooks";
import { setLimit } from "./reducer";

const useStyles = makeStyles({
  gridItem: {
    width: 150,
  },
});

const LimitSlider = () => {
  const classes = useStyles();
  const [value, setValue] = useState<number>(10);
  const dispatch = useAppDispatch();

  const valueText = (value: number) => {
    return value.toString();
  };

  const handleChange = (event: ChangeEvent<{}>, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleChangeCommitted = (event: ChangeEvent<{}>, newValue: number | number[]) => {
    dispatch(setLimit(newValue))
  };

  return (
    <Grid item className={classes.gridItem}>
      <Typography id="continuous-slider" gutterBottom>
        Limit
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        aria-labelledby="continuous-slider"
        getAriaValueText={valueText}
        min={1}
        max={50}
      />
    </Grid>
  )
}

export default LimitSlider;

import React, { ChangeEvent, useState } from "react";
import { Grid, makeStyles, Slider, Typography } from "@material-ui/core";
import { useAppDispatch } from "../../../../lib/hooks";
import { setOffset } from "./reducer";

const useStyles = makeStyles({
  gridItem: {
    width: 150,
  },
});

const OffsetSlider = () => {
  const classes = useStyles();
  const [value, setValue] = useState<number>(0);
  const dispatch = useAppDispatch();

  const valueText = (value: number) => {
    return value.toString();
  };

  const handleChange = (event: ChangeEvent<{}>, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleChangeCommitted = (event: ChangeEvent<{}>, newValue: number | number[]) => {
    dispatch(setOffset(newValue));
  };

  return (
    <Grid item className={classes.gridItem}>
      <Typography id="continuous-slider" gutterBottom>
        Offset
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        aria-labelledby="continuous-slider"
        getAriaValueText={valueText}
        min={0}
        max={49}
      />
    </Grid>
  )
}

export default OffsetSlider;

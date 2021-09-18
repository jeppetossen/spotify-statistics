import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useAppSelector } from "../../../lib/hooks";
import { getTopTracks } from "../../../spotify/spotify";
import { selectTimeRange } from "../../MainView/Controls/TimeRange/reducer";
import MainView from "../../MainView";
import { selectLimit } from "../../MainView/Controls/LimitSlider/reducer";
import { selectOffset } from "../../MainView/Controls/OffsetSlider/reducer";
import TopList from "../common";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: 'hidden',
      height: 550,
    },
    paper: {
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
    item: {
      padding: "0 8px",
    },
    rank: {
      margin: "auto",
      display: "block",
      maxWidth: 16,
    },
  }),
);

const TopTracks = (): JSX.Element => {
  const {root} = useStyles();

  const timeRange = useAppSelector(selectTimeRange);
  const limit = useAppSelector(selectLimit);
  const offset = useAppSelector(selectOffset);

  const [tracks, setTracks] = useState<Array<any>>([]);

  useEffect(() => {
    const run = async () => {
      const data = await getTopTracks(limit, timeRange, offset);

      // TODO: Better solution for long track names
      const newData = data.map((value: any) => {
        if (value.info.name.length > 45) {
          value.info.name = value.info.name.slice(0, 41) + "...";
        }
        return value;
      });
      setTracks(newData);
    };

    run();
  }, [timeRange, limit, offset]);

  return (
    <MainView>
      <div className={root}>
        <TopList data={tracks}/>
      </div>
    </MainView>
  )
}

export default TopTracks;

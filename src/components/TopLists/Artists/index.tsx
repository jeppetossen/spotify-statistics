import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { getTopArtists } from "../../../spotify/spotify";
import { selectLimit } from "../../MainView/Controls/LimitSlider/reducer";
import { selectOffset } from "../../MainView/Controls/OffsetSlider/reducer";
import MainView from "../../MainView";
import TopList from "../common";
import { useAppSelector } from "../../../lib/hooks";
import { selectTimeRange } from "../../MainView/Controls/TimeRange/reducer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: 'hidden',
      height: 550,
    },
  }),
);

const TopArtists = (): JSX.Element => {
  const {root} = useStyles();

  const timeRange = useAppSelector(selectTimeRange);
  const limit = useAppSelector(selectLimit);
  const offset = useAppSelector(selectOffset);

  const [artists, setArtists] = useState<Array<any>>([]);

  useEffect(() => {
    const run = async () => {
      const data = await getTopArtists(limit, timeRange, offset);
      setArtists(data);
    };

    run();
  }, [timeRange, limit, offset]);

  return (
    <MainView>
      <div className={root}>
        <TopList data={artists} />
      </div>
    </MainView>
  )
}

export default TopArtists;

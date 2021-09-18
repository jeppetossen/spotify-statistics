import { average } from "./getColor";

// TODO: add more variants of palettes
export type PaletteColors = {
  average: string
};

export const getPalette = async (src: string) => {
  const palette = await average(src);
  const setPaletteColor = (acc: any, paletteName: any) => ({
    ...acc,
    average: palette
  });

  return Object.keys("average").reduce(setPaletteColor, {});
};
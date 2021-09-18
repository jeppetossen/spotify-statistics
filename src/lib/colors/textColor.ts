export const getTextColor = (rgb: any) => {
  let o = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000);

  let color;
  if (o > 125) {
    color = "rgb(16, 16, 16)"
  } else {
    color = "rgb(244, 244, 244)"
  }

  return color;
}

export const getSubTextColor = (rgb: any) => {
  let o = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000);

  let color;
  if (o > 125) {
    color = "rgb(33, 33, 33, 0.7)"
  } else {
    color = "rgb(220, 220, 220, 0.85)"
  }

  return color;
}


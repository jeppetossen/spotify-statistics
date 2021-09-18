# Spotify Statistics

Displays statistics for an authenticated user using [spotify's web api](https://developer.spotify.com/documentation/web-api/)
and [redux](https://redux-toolkit.js.org/).

The app uses the [Implicit Grant Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow)
authorization flow provided by the api.

The stack used is as follows:
* [React](https://reactjs.org/)
* [Material-UI](https://v4.mui.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [Redux Toolkit](https://redux-toolkit.js.org/)

## Features

An authenticated user may look up their top tracks or artists with the help of 3 separate controls.
These controls are variables exposed by the Spotify API. If any of the values are not equal to default
they get sent to the body in a GET-method.

1. Time range
   
    The available time ranges are "short term", "medium term" and "long term". 
    They cover 1 month, 6 months and all time in that respective order.

2. Limit

    The limit can be any value between 1-50. This controls how many items are retrieved and shown.

3. Offset

    The offset can be any value between 0-49. Use with limit to get the next set of items.
    
    Example: if offset is set to 0, the set of items will start from index 0.
    If offset is set to 10, the set of items will start from index 10.
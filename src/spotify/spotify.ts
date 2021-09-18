import Cookies from "js-cookie";

import urls from "../utils/urls";
import SpotifyWebApi from "spotify-web-api-js";
import { ICookieOptions } from "../lib/types";


const spotify = new SpotifyWebApi();

type TCommonHeader = {
  method: string,
  headers: {
    [key: string]: string
  },
}

const commonHeader = (token: string): TCommonHeader => {
  return {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
};

const commonFetch = async (endpoint: string) => {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return null;
  }

  const response = await fetch(urls.apiUrl + endpoint, commonHeader(accessToken));
  const data = await response.json();
  return data.items;
};

const minimizedTracksData = (data: Array<any>) => {
  return data.map((value: any) => {
    let obj: any = {};

    obj["image"] = value.album.images.at(-1);

    obj["artists"] = value.artists.map((value: any) => {
      let artObj: any = {};
      artObj["id"] = value.id;
      artObj["name"] = value.name
      return artObj
    });

    obj["info"] = {
      "name": value.name,
      "id": value.id,
      "type": "tracks",
    };

    return obj;
  });
};

const minimizedArtistsData = (data: Array<any>) => {
  return data.map((value: any) => {
    let obj: any = {};

    obj["image"] = value.images.at(-1);

    obj["genres"] = value.genres;

    obj["info"] = {
      "name": value.name,
      "id": value.id,
      "type": "artists",
    };

    return obj;
  });
};

export const getUserProfile = async () => {
  const endpoint = "/me";
  return await commonFetch(endpoint);
};

export const getRecentlyPlayed = async (limit: number) => {
  const endpoint = `/me/player/recently-played?limit=${limit}`;
  return await commonFetch(endpoint);
};

export const getTopArtists = async (limit: number, time_range: string, offset: number) => {
  let endpoint = `/me/top/artists?&time_range=${time_range}`;

  if (limit > 0) {
    endpoint += `&limit=${limit}`;
  }

  if (offset > 0) {
    endpoint += `&offset=${offset}`;
  }

  const artistsRaw = await commonFetch(endpoint);
  return minimizedArtistsData(artistsRaw);
};

export const getTopTracks = async (limit: number, time_range: string, offset: number) => {
  let endpoint = `/me/top/tracks?time_range=${time_range}`;

  if (limit > 0) {
    endpoint += `&limit=${limit}`;
  }

  if (offset > 0) {
    endpoint += `&offset=${offset}`;
  }

  const tracksRaw = await commonFetch(endpoint);
  return minimizedTracksData(tracksRaw);
};

export const getPlaylists = async (limit: number) => {
  const endpoint = `/me/playlists?limit=${limit}`;
  return await commonFetch(endpoint);
};

/* TOKEN */

const saveAccessToken = (token: string): void => {
  if (getCookie()) {
    removeCookie();
  }

  const expireInOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
  let options: ICookieOptions = {
    expires: expireInOneHour,
    sameSite: "strict"
  };

  Cookies.set("accessToken", token, options);
};

export const getAccessToken = (): string | null | undefined => {
  if (getCookie()) {
    return getCookie();
  }

  const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial: { [key:string]: string }, item: string) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});

  window.location.hash = '';
  const accessToken = hash.access_token;

  if (!accessToken) {
    return null;
  }

  const cookieAccessToken = Cookies.get("accessToken");

  if (!spotify.getAccessToken() && accessToken !== "undefined") {
    spotify.setAccessToken(accessToken)
  }

  if (!cookieAccessToken && accessToken !== "undefined") {
    saveAccessToken(accessToken);
    return accessToken;
  }

  return spotify.getAccessToken();
};

export const getCookie = () => {
  return Cookies.get("accessToken");
};

export const removeCookie = (): void => {
  Cookies.remove("accessToken");
};

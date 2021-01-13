import React from "react";
import axios from "axios";
import qs from "querystring";

export const authEndpoint = "https://accounts.spotify.com/authorize";

export const scopes = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
  "streaming",
  "playlist-read-collaborative",
  "user-modify-playback-state",
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "user-library-modify",
];

export async function getTokens(
  encoded_data: string,
  code: any,
  redirect_uri: string
) {
  const headers = {
    headers: {
      Authorization: "Basic " + encoded_data,
    },
  };

  const data = {
    grant_type: "authorization_code",
    code,
    redirect_uri,
  };

  const res = await axios
    .post("https://accounts.spotify.com/api/token", qs.stringify(data), headers)
    .catch((error) => error.response);

  return res;
}

export async function refreshToken(
  encoded_data: string,
  refresh_token: string
) {
  const headers = {
    headers: {
      Authorization: "Basic " + encoded_data,
    },
  };

  const data = {
    grant_type: "refresh_token",
    refresh_token,
  };

  const res = await axios
    .post("https://accounts.spotify.com/api/token", qs.stringify(data), headers)
    .catch((error) => error.response);

  return res;
}

export async function checkDeadConnection(token: string) {
  return fetch(`https://api.spotify.com/v1/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((d) => d.json())
    .catch((error) => error.response);
}

export async function getTracks(
  token: string,
  href: string,
  callback: React.Dispatch<any>
) {
  const { data } = await axios.get(href, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // callback(songs);
  if (data && data.items) {
    callback(data.items);
  }
}

export async function getDevices(token: string) {
  return fetch(`https://api.spotify.com/v1/me/player/devices`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  }).then((d) => d.json());
}

export async function getPlaylists(token: string) {
  return fetch(`https://api.spotify.com/v1/me/playlists`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  }).then((d) => d.json());
}

export async function getPlaybackState(token: string) {
  return fetch(`https://api.spotify.com/v1/me/player`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  }).then((d) => {
    if (d.status === 204) {
      return null;
    }

    return d.json();
  });
}

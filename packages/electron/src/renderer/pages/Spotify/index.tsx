import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { checkDeadConnection, refreshToken } from "../../api/spotify";
import { useMst } from "../../models";
import Auth from "./Auth";
import SpotifyPlayer from "react-spotify-web-playback";
import Playlists from "./Playlists";
import PlaylistSongs from "./PlaylistSongs";

const SpotifyLayout = observer(
  ({ children }: { children: React.ReactNode }) => {
    const store = useMst();

    const { spotify } = store.player;
    const { token } = spotify;

    const dark = store.player.theme === "dark";

    const playerStyle = dark
      ? {
          bgColor: "#27292f",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#7f9cf5",
          savedColor: "#fff",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
        }
      : {
          bgColor: "#333",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          savedColor: "#fff",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
        };

    return (
      <div className="h-screen overflow-hidden flex flex-col">
        {/* 
        I'm not sure how I feel about this package. You have to have a spotify instance
        already running on a device. Ideally, the computer running the menubar app would be 
        counted as a device, so that way you do not need to launch the actual spotify instance 
        on the computer. Sometimes, it just loads and loads and never renders the player, as well.
      */}
        {children}
        <SpotifyPlayer
          token={token!}
          uris={["spotify:track:6rqhFgbbKwnb9MLmUQDhG6"]}
          styles={playerStyle}
          persistDeviceSelection
          showSaveIcon
        />
      </div>
    );
  }
);

export default function () {
  const store = useMst();
  const navigate = useNavigate();

  const [playlists, setPlaylists] = useState<any>();

  async function checkToken(token: string) {
    const ping = await checkDeadConnection(token);

    if (ping.error) {
      const newToken = await refreshToken(
        btoa(
          `${store.player.spotify.clientId}:${store.player.spotify.clientSecret}`
        ),
        // assumption: cannot have refresh token w/out token and
        // cannot get to this function without token
        store.player.spotify.refreshToken!
      );

      const { access_token } = newToken.data;

      if (access_token) {
        // FIXME: This is not working as intended, it seems the token gets properly reset, but the
        // playlist component renders before that is completed? and so the token is outdated and
        // results in an authorization error. If you navigate home and then back to spotify
        // its corrected though
        store.player.spotify.setToken(access_token);
        navigate("/spotify");
      }
    }
  }

  useEffect(() => {
    const {
      clientId,
      clientSecret,
      token,
      refreshToken,
    } = store.player.spotify;

    if (!clientId || !clientSecret || !token || !refreshToken) {
      navigate("authenticate");
    } else if (token) {
      checkToken(token);
    }
  }, []);

  return (
    <Routes>
      <Route path="/">
        <Route
          path=""
          element={
            <SpotifyLayout>
              <Playlists playlists={playlists} setPlaylists={setPlaylists} />
            </SpotifyLayout>
          }
        />
        <Route
          path="playlist/:index"
          element={
            <SpotifyLayout>
              <PlaylistSongs playlists={playlists} />
            </SpotifyLayout>
          }
        />
      </Route>
      <Route path="authenticate" element={<Auth />} />
    </Routes>
  );
}

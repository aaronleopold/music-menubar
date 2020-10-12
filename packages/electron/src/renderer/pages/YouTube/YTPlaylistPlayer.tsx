import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "../../models";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import PlayerControls from "../../components/PlayerControls";
// import "youtube";
import { getRandomGif } from "../../utils";
import Loader from "react-loader-spinner";
import clsx from "clsx";
import { Gif } from "../../assets/gifs";

// const baseURL = "https://www.googleapis.com/youtube/v3/playlistItems";

// hard coding here becuase import 'youtube' wasn't actually loading script
if (typeof YT == "undefined" || typeof YT.Player == "undefined") {
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
}

// TODO: store onExit view function to collect where left off in playlist if not finished
// TODO: collect any stored info about where left off and initialize player with that on navigate
// to page

export default observer(() => {
  const store = useMst();

  const { index } = useParams();

  const { youtube, theme } = store.player;
  const dark = theme === "dark";

  const [player, createPlayer] = useState<YT.Player | undefined>();
  const playerRef = useRef(player);

  const [playing, setPlaying] = useState(false);

  const [current, setCurrent] = useState<
    { title: string; videoUrl: string; videoId: string } | undefined
  >();
  const currentRef = useRef(current);

  const [bg, setBg] = useState<Gif>();

  const playlist = youtube.playlists[Number(index)];

  function checkIsFavorite() {
    if (!current) return undefined;

    const { favorites } = youtube;

    const existing = favorites.find((favorite) => {
      return (
        favorite.name === current.title && favorite.link === current.videoUrl
      );
    });

    return existing;
  }

  function favoriteSong() {
    if (!current) return;

    const existing = checkIsFavorite();

    if (!existing) {
      youtube.addFavorite(current.title, current.videoUrl);
    } else {
      youtube.deleteFavorite(existing);
    }
  }

  function onPlayerReady(e: any) {
    e.target.loadPlaylist({
      list: playlist.playlistId,
      listType: "playlist",
      index: 0,
      startSeconds: 0,
      suggestedQuality: "small",
    });
  }

  function onPlayerStateChange(e: any) {
    const { videoUrl } = e.target.playerInfo;
    const { title, video_id } = e.target.playerInfo.videoData;

    const currentlyPlaying = e.target.getPlayerState() === 1;

    if (currentlyPlaying !== playing) {
      setPlaying(currentlyPlaying);
    }

    if (
      !currentRef.current ||
      currentRef.current.title !== title ||
      currentRef.current.videoId !== video_id
    ) {
      // console.log(currentRef.current, title, videoUrl);
      setCurrent({ title, videoUrl, videoId: video_id });
      setBg(getRandomGif());
    }
  }

  // Updating the reference to the player state, so the
  // useEffect hook underneath can properly clean up
  useEffect(() => {
    playerRef.current = player;
    currentRef.current = current;
  }, [player, current]);

  useEffect(() => {
    if (!player) {
      createPlayer(
        // @ts-ignore
        new YT.Player("player", {
          height: "300",
          width: "300",
          playerVars: {
            controls: "0",
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        })
      );

      setPlaying(true);
    }

    // on the unmount, I will eventually want to store the
    // players current position in the playlist. This cleanup
    // function will get the current playtime and playlist index
    // to be used in reinitializing the player object next time
    // this playlist is selected
    // TODO
    return () => {
      if (playerRef.current) {
        const timePlayed = playerRef.current.getCurrentTime();
        const playlistIndex = playerRef.current.getPlaylistIndex();

        console.log(timePlayed, playlistIndex);
      }
    };
  }, []);

  // if (player) {
  //   console.log(playerRef.current?.getDuration());
  //   playerRef.current?.seekTo(140, true);
  // }

  return (
    <div
      className={clsx(dark && "bg-dark", "relative h-screen overflow-hidden")}
    >
      <Header back="/youtube" title={playlist.name} dark clear />

      <div id="player" className="hidden" />

      {!bg ? (
        <div className="full-minus-header flex items-center justify-center">
          <Loader type="Bars" color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <React.Fragment>
          <div className="absolute right-0 m-2 text-white z-10 text-sm">
            <a href={bg.source} target="_blank" rel="noopener">
              Like this gif?
            </a>
          </div>

          <img
            className="absolute object-cover w-screen h-screen top-0"
            src={bg.gif}
          />
        </React.Fragment>
      )}

      {player && current && bg && (
        <a className="absolute inset-0 flex flex-col space-y-4 items-center justify-center text-center text-white font-semibold text-2xl text-shadow-lg tracking-wider">
          <p>{current.title}</p>
          <span onClick={favoriteSong}>
            <svg
              className="w-8 h-8 hoverable"
              fill={clsx(checkIsFavorite() ? "white" : "none")}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </span>
        </a>
      )}

      {player && (
        <PlayerControls
          playing={playing}
          onPlay={() => {
            player.playVideo();
            setPlaying(true);
          }}
          onPause={() => {
            player.pauseVideo();
            setPlaying(false);
          }}
          onSkip={() => player.nextVideo()}
          onReplay={() => player.previousVideo()}
        />
      )}
    </div>
  );
});

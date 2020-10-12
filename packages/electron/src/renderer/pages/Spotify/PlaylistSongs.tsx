import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTracks } from "../../api/spotify";
import Header from "../../components/Header";
import { useMst } from "../../models";

type SongProps = {
  name: string;
  artist: string;
  albumArt: string;
  onClick(): void;
  dark: boolean;
  playing?: boolean;
};

function Song({ name, artist, albumArt, playing, onClick, dark }: SongProps) {
  return (
    <li
      onClick={onClick}
      className={clsx(
        dark
          ? playing
            ? "bg-darker hover:bg-gray-500"
            : "bg-dark hover:bg-gray-500"
          : "hover:bg-gray-100",
        "p-6 flex transition-colors duration-150 cursor-pointer"
      )}
    >
      <div className="flex flex-1 space-x-4">
        <div>
          <img src={albumArt} className="h-12 object-scale-down" />
        </div>
        <div
          className={clsx(dark ? "text-white" : "text-gray-900", "font-bold")}
        >
          <p>{name}</p>
          <p className="text-sm">{artist}</p>
        </div>
      </div>
      <div className="flex items-center">
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={clsx(dark && "text-white", "w-6 ml-6")}
        >
          <path d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </li>
  );
}

export default function PlaylistSongs({ playlists }: { playlists: any }) {
  const store = useMst();
  const index = useParams().index;

  const [songs, setSongs] = useState<any>();

  const dark = store.player.theme === "dark";

  const { spotify } = store.player;

  if (!index) {
    return <div>Invalid URL</div>;
  }

  const playlist = playlists[index];

  useEffect(() => {
    if (!songs) {
      getTracks(spotify.token!, playlist.tracks.href, setSongs);
    }
  }, []);

  return (
    <React.Fragment>
      <Header title={playlist.name} dark={true} back="/spotify" />
      <div className={clsx(dark && "bg-dark", "flex-1 overflow-scroll")}>
        {/* TODO: learn suspense and make this functional */}
        <React.Suspense fallback={<div>........LOADING</div>}>
          {songs &&
            songs.map((song: any, _index: number) => {
              const { track } = song;

              const { album, artists, href, id, name, uri } = track;

              console.log(href, uri);

              const artist = artists[0].name;
              return (
                <Song
                  name={name}
                  dark={dark}
                  key={id}
                  onClick={() => {}}
                  artist={artist}
                  albumArt={album.images[0].url}
                />
              );
            })}

          {!songs ||
            (songs.length === 0 && (
              <p className={clsx(dark && "text-white", "text-center")}>
                No songs could be loaded.
              </p>
            ))}
        </React.Suspense>
      </div>
    </React.Fragment>
  );
}

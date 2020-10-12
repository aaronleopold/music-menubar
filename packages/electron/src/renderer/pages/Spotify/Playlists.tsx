import clsx from "clsx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { getPlaylists } from "../../api/spotify";
import Header from "../../components/Header";
import Playlist from "../../components/Spotify/Playlist";
import { useMst } from "../../models";
import { useNavigate } from "react-router-dom";

type Props = {
  playlists: any;
  setPlaylists: React.Dispatch<any>;
};

export default observer(({ playlists, setPlaylists }: Props) => {
  const store = useMst();
  const { spotify } = store.player;
  const { token } = spotify;
  const navigate = useNavigate();

  const dark = store.player.theme === "dark";

  // const [playlists, setPlaylists] = useState<any>();

  async function initPlaylists(token: string) {
    const playlistRes = await getPlaylists(token);

    if (playlistRes.items) {
      setPlaylists(playlistRes.items);
    }
  }

  useEffect(() => {
    if (!playlists && token) {
      initPlaylists(token);
    }
  }, []);

  return (
    <React.Fragment>
      <Header title="Spotify Playlists" dark={dark} back="/" />
      <div className={clsx(dark && "bg-dark", "flex-1 overflow-scroll")}>
        {/* TODO: learn suspense and make this functional */}
        <React.Suspense fallback={<div>........LOADING</div>}>
          {playlists &&
            playlists.map((playlist: any, index: number) => {
              return (
                <Playlist
                  name={playlist.name}
                  dark={dark}
                  key={playlist.name}
                  onClick={() => navigate(`playlist/${index}`)}
                />
              );
            })}

          {!playlists ||
            (playlists.length === 0 && (
              <p className={clsx(dark && "text-white", "text-center")}>
                No playlists could be loaded.
              </p>
            ))}
        </React.Suspense>
      </div>
    </React.Fragment>
  );
});

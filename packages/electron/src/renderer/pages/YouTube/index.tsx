import React from "react";
import Header from "../../components/Header";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useMst } from "../../models";
import clsx from "clsx";
import Playlists from "../../components/YT/Playlists";
import Streams from "../../components/YT/Streams";
import YTPlaylistPlayer from "./YTPlaylistPlayer";
import YTPlaylistSettings from "./YTPlaylistSettings";
import YTStreamPlayer from "./YTStreamPlayer";
import YTStreamSettings from "./YTStreamSettings";
import YTFavorites from "./YTFavorites";

function Home() {
  const store = useMst();

  const navigate = useNavigate();

  const dark = store.player.theme === "dark";

  return (
    <div className={clsx(dark && "bg-dark", "min-h-screen")}>
      <Header
        title="YouTube"
        dark={dark}
        action={
          <button
            onClick={() => navigate("favorites")}
            className="text-white hover:bg-gray-700 rounded-full p-2 focus:outline-none transition-colors duration-150"
          >
            <svg
              className="w-6 h-6"
              fill="none"
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
          </button>
        }
      />
      <Playlists />
      <Streams />
    </div>
  );
}

export default function () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="favorites" element={<YTFavorites />} />
      <Route path="playlist/play/:index" element={<YTPlaylistPlayer />} />
      <Route path="playlist/settings/:index" element={<YTPlaylistSettings />} />
      <Route path="stream/play/:index" element={<YTStreamPlayer />} />
      <Route path="stream/settings/:index" element={<YTStreamSettings />} />
    </Routes>
  );
}

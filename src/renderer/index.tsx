import "./index.css";
import React from "react";
import { render } from "react-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Provider } from "./models";
import Settings from "./pages/Settings";
import ToastManager from "./components/ToastManager";
import YouTube from "./pages/YouTube";
import Spotify from "./pages/Spotify";
import SoundCloud from "./pages/SoundCloud";
import LocalLibrary from "./pages/LocalLibrary";

require("dotenv").config();

function App() {
  return (
    <Provider>
      <ToastManager>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/youtube/*" element={<YouTube />} />
            <Route path="/spotify/*" element={<Spotify />} />
            <Route path="/soundcloud/*" element={<SoundCloud />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/library" element={<LocalLibrary />} />
          </Routes>
        </MemoryRouter>
      </ToastManager>
    </Provider>
  );
}

render(<App />, document.getElementById("app"));

import clsx from "clsx";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../../components/Header";
import { useMst } from "../../models";

function Home() {
  const store = useMst();

  const dark = store.player.theme === "dark";

  return (
    <div className={clsx(dark && "bg-dark", "min-h-screen")}>
      <Header title="SoundCloud" dark={dark} />
      <p className={clsx(dark && "text-white", "text-center mt-6")}>
        Unfortunately, SoundCloud is not currently accepting API key requests 😭
        and so this feature will be unavailable for the time being.
      </p>
    </div>
  );
}

export default function () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

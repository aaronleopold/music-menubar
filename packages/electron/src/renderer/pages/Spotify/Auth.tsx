import React from "react";
import { observer } from "mobx-react-lite";
import { authEndpoint, scopes } from "../../api/spotify";
import clsx from "clsx";
import { useMst } from "../../models";
import Header from "../../components/Header";

export default observer(() => {
  const store = useMst();

  const { spotify, theme } = store.player;
  const dark = theme === "dark";

  return (
    <div className={clsx(dark && "bg-dark", "min-h-screen")}>
      <Header title="Spotify" dark={dark} back="/" />
      <div className="p-6 flex flex-col items-center space-y-6">
        <h3
          className={clsx(
            dark ? "text-white" : "text-gray-900",
            "text-center text-xl font-bold"
          )}
        >
          You're missing just a couple things
        </h3>
        <p
          className={clsx(dark ? "text-white" : "text-gray-900", "text-center")}
        >
          To get started, you'll need to enter a Client ID, a Client Secret and
          then login through Spotify
        </p>
        <div className="w-full text-left">
          <label
            className={clsx(
              dark ? "text-white" : "text-gray-700",
              "block text-sm leading-5 font-medium "
            )}
          >
            Spotify Client ID
          </label>

          <input
            className="form-input w-full mt-1 rounded-md border border-gray-300 px-4 py-2 text-sm leading-5"
            type="password"
            placeholder="Enter your client ID here"
            value={spotify.clientId}
            onChange={(e) => spotify.setClientId(e.target.value)}
          />
        </div>

        <div className="w-full text-left">
          <label
            className={clsx(
              dark ? "text-white" : "text-gray-700",
              "block text-sm leading-5 font-medium "
            )}
          >
            Spotify Client Secret
          </label>

          <input
            className="form-input w-full mt-1 rounded-md border border-gray-300 px-4 py-2 text-sm leading-5"
            type="password"
            placeholder="Enter your client ID here"
            value={spotify.clientSecret}
            onChange={(e) => spotify.setClientSecret(e.target.value)}
          />
        </div>

        <a
          className={clsx(
            dark
              ? "border-green-600 bg-green-100 hover:bg-green-600 text-green-800 hover:text-white"
              : "border-green-600 bg-white hover:bg-green-600 text-green-600 hover:text-white",
            "rounded-full border-2 transition-colors focus:outline-none duration-300 flex text-lg px-4 py-2 items-center justify-center font-semibold"
          )}
          href={`${authEndpoint}?client_id=${spotify.clientId}&redirect_uri=${
            process.env.ELECTRON_WEBPACK_APP_REDIRECT_URL
          }&scope=${scopes.join("%20")}&response_type=code&show_dialog=true`}
        >
          Login to Spotify
        </a>
      </div>
    </div>
  );
});

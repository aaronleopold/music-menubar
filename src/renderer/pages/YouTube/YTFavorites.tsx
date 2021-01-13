import React from "react";
import { observer } from "mobx-react-lite";
import Header from "../../components/Header";
import clsx from "clsx";
import CopyToClipboard from "react-copy-to-clipboard";
import { useMst } from "../../models";

type Props = {
  dark: boolean;
  name: string;
  link: string;
  onDelete(): void;
  onCopy(): void;
};
function Favorite({ dark, name, link, onDelete, onCopy }: Props) {
  return (
    <li
      className={clsx(
        dark ? "bg-dark hover:bg-gray-500" : "hover:bg-gray-100 ",
        "p-6 flex transition-colors duration-150 cursor-pointer"
      )}
    >
      <div className="flex-1">
        <div
          className={clsx(dark ? "text-white" : "text-gray-900", "font-bold")}
        >
          {name}
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-red-500 hover:text-red-700"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="trash w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <CopyToClipboard text={link} onCopy={onCopy}>
          <svg
            className={clsx(dark && "text-white", "w-6 ml-6")}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </CopyToClipboard>
      </div>
    </li>
  );
}

export default observer(() => {
  const store = useMst();

  const dark = store.player.theme === "dark";

  const { youtube } = store.player;
  const { favorites } = youtube;

  function makeToast() {
    const toast = store.player.addToast({
      status: "success",
      title: "Copied link!",
    });

    console.log(toast);

    setTimeout(() => {
      store.player.removeToast(toast);
    }, 3000);
  }

  return (
    <div className="relative h-screen">
      <Header title="Favorites" dark={dark} action />
      <div
        className={clsx(
          dark && "bg-dark text-white",
          "full-minus-header overflow-scroll"
        )}
      >
        {favorites.length === 0 && (
          <div className="py-4 text-center">No favorites added</div>
        )}

        {favorites.length > 0 &&
          favorites.map((favorite) => {
            return (
              <Favorite
                key={favorite.link}
                {...favorite}
                dark={dark}
                onDelete={() => youtube.deleteFavorite(favorite)}
                onCopy={makeToast}
              />
            );
          })}
      </div>
    </div>
  );
});

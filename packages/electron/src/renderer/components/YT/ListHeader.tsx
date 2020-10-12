import clsx from "clsx";
import React from "react";
import { useMst } from "../../models";

type Props = {
  title: string;
  toggleCreate(): void;
};

export default function ListHeader({ title, toggleCreate }: Props) {
  const store = useMst();

  const dark = store.player.theme === "dark";

  return (
    <div
      className={clsx(
        dark ? "bg-dark" : "bg-white",
        "sticky px-6 py-2 z-10 header-offset"
      )}
    >
      <div className="flex justify-between items-center">
        <h3
          className={clsx(
            dark ? "text-white" : "text-gray-900",
            "text-xl font-bold "
          )}
        >
          {title}
        </h3>

        <button
          onClick={toggleCreate}
          className={clsx(
            dark
              ? "border-white-600 hover:bg-white text-white  hover:text-black"
              : "border-indigo-600 bg-white hover:bg-indigo-600 text-indigo-600  hover:text-white",
            "flex justify-between space-x-2 rounded-full border-2 transition-colors focus:outline-none duration-300 text-lg px-2 py-1 items-center font-semibold"
          )}
        >
          <svg
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-4 w-4 font-bold"
          >
            <path d="M12 4v16m8-8H4"></path>
          </svg>

          <p className="text-sm">Create</p>
        </button>
      </div>
    </div>
  );
}

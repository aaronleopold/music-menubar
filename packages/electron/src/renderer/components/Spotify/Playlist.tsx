import clsx from "clsx";
import React from "react";

export default function Playlist({
  name,
  onClick,
  dark,
}: {
  name: string;
  onClick?(): void;
  dark: boolean;
}) {
  return (
    <li
      onClick={onClick}
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

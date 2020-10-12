import clsx from "clsx";
import React from "react";
import { useNavigate } from "react-router-dom";

type ListItem = {
  to: string;
  name: string;
  toEdit: string;
  dark: boolean;
};

export default function ({ to, name, toEdit, dark }: ListItem) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(to);
      }}
      className={clsx(
        dark ? "bg-dark hover:bg-gray-500" : "hover:bg-gray-100 ",
        "p-6 flex transition-colors duration-150 cursor-pointer"
      )}
    >
      <div className="flex-1 truncate">
        <div
          className={clsx(
            dark ? "text-white" : "text-gray-900",
            "font-bold truncate"
          )}
        >
          {name}
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(toEdit);
          }}
          className={clsx(
            dark ? "text-white hover:text-gray-300" : "hover:text-gray-600 ",
            "mr-4"
          )}
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>

        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={clsx(
            dark && "text-white hover:text-gray-300",
            "w-6 ml-6 hover:text-gray-600"
          )}
        >
          <path d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </li>
  );
}

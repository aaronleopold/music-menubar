import React from 'react';

type Props = {
  onClick(): void;
};

export default function CreateButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="dark:border-white-600 dark:bg-transparent dark:hover:bg-white dark:text-white dark:hover:text-black border-indigo-600 bg-white hover:bg-indigo-600 text-indigo-600  hover:text-white flex justify-between space-x-2 rounded-full border-2 transition-colors focus:outline-none duration-300 text-lg px-2 py-1 items-center font-semibold"
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
  );
}

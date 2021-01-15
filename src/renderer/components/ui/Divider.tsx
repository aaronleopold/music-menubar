import React from 'react';

type Props = {
  text?: string;
};

export default function Divider({ text }: Props) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300 dark:border-dark-200"></div>
      </div>
      <div className="relative flex justify-center text-sm leading-5">
        <span className="px-2 bg-white dark:bg-dark-800 text-gray-500 dark:text-dark-200">
          {text}
        </span>
      </div>
    </div>
  );
}

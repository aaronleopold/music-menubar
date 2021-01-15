import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

type HItem = {
  children: React.ReactNode;
  className?: string;
};

function HeaderItem({ children, className }: HItem) {
  return <div className={clsx('flex items-center', className)}>{children}</div>;
}

type Props = {
  back?: string;
  title: string;
  action?: React.ReactNode;
  clear?: boolean;
};

export default function Header({ back, title, action, clear }: Props) {
  const location = useLocation();

  return (
    <div
      className={clsx(
        clear && 'bg-transparent',
        !clear && 'dark:bg-dark-800 bg-white border-blackish',
        'px-4 app-header overflow-hidden grid grid-cols-6 border-b sticky top-0 z-20'
      )}
    >
      <HeaderItem className="justify-start col-span-1">
        {location.pathname === '/' ? (
          <button
            className="text-gray-600 dark:text-gray-200 rounded-full p-2 outline-none "
            disabled
          >
            <svg
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
        ) : (
          <Link
            to={back ? back : '..'}
            className={clsx(
              clear && 'text-white hover:bg-gray-200 hover:text-gray-800',
              !clear &&
                'dark:text-white dark:hover:bg-gray-700 hover:bg-gray-200',
              'rounded-full p-2 focus:outline-none transition-colors duration-150'
            )}
          >
            <svg
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
          </Link>
        )}
      </HeaderItem>
      <HeaderItem className="justify-center col-span-4">
        <h1 className="dark:text-white text-gray-900 text-center text-2xl font-bold flex-1 truncate">
          {title}
        </h1>
      </HeaderItem>
      <HeaderItem className="justify-end col-span-1">{action}</HeaderItem>
    </div>
  );
}

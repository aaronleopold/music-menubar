import React from 'react';
import { observer } from 'mobx-react-lite';
import { useMst } from '../models';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import ytGif from '../assets/homepage/mastermind.gif';
import ytLogoGif from '../assets/homepage/ytlogo.gif';
import soundCloudGif from '../assets/homepage/nightshift.gif';

function PageLink({
  bg,
  to,
  children,
}: {
  bg: any;
  to: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-1/2 relative overflow-hidden">
      <img className="object-cover w-full h-full" src={bg} />

      <Link
        to={to}
        className="absolute inset-0 flex items-center justify-center text-white font-semibold text-4xl text-shadow-lg tracking-wider"
      >
        <div className="relative">{children}</div>
      </Link>
    </div>
  );
}

export default observer(() => {
  const store = useMst();

  const { theme } = store.player;

  return (
    <div className={clsx(theme === 'dark' && 'bg-dark', 'min-h-screen')}>
      <Header
        dark={theme === 'dark'}
        title="Welcome"
        action={
          <Link
            to="settings"
            className={clsx(
              theme === 'dark'
                ? 'text-white hover:bg-gray-700 '
                : 'hover:bg-gray-200 ',
              'rounded-full p-2 focus:outline-none transition-colors duration-150'
            )}
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="cog w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        }
      />
      <div className="full-minus-header">
        <PageLink to="library" bg={soundCloudGif}>
          Local Library
        </PageLink>

        <PageLink to="/youtube" bg={ytGif}>
          <img
            className="object-cover w-1/3 mx-auto opacity-50 hover:opacity-100  transition-opacity ease-in-out duration-200"
            src={ytLogoGif}
          />
        </PageLink>
      </div>
    </div>
  );
});

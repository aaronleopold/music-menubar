import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useMst } from '../models';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { parse } from 'querystring';
import { getTokens } from '../api/spotify';

// THIS IS MESSY
import ytGif from '../assets/homepage/mastermind.gif';
import ytLogoGif from '../assets/homepage/ytlogo.gif';

import spotifyGif from '../assets/homepage/spotifybg.gif';
import spotifyLogoGif from '../assets/homepage/spotify.gif';

import soundCloudGif from '../assets/homepage/nightshift.gif';
// I DONT LIKE DIRECT IMPORTS

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
    <div className="h-1/3 relative overflow-hidden">
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

  async function initSpotify(code: any) {
    const { data } = await getTokens(
      btoa(
        `${store.player.spotify.clientId}:${store.player.spotify.clientSecret}`
      ),
      code,
      'http://localhost:8080'
    );

    const { access_token, refresh_token } = data;

    if (access_token && refresh_token) {
      store.player.spotify.setToken(access_token);
      store.player.spotify.setRefreshToken(refresh_token);
    }

    window.location.search = '';
  }

  useEffect(() => {
    const code = parse(window.location.search)['?code'];
    if (code) {
      initSpotify(code);
    }
  });

  return (
    <div className={clsx(theme === 'dark' && 'bg-dark', 'min-h-screen')}>
      <Header
        dark={theme === 'dark'}
        title="Welcome"
        action={
          <React.Fragment>
            <Link
              to="library"
              className={clsx(
                theme === 'dark'
                  ? 'text-white hover:bg-gray-700 '
                  : 'hover:bg-gray-200 ',
                'rounded-full p-2 focus:outline-none transition-colors duration-150 mr-2'
              )}
            >
              <svg
                id="Layer_1"
                enableBackground="new 0 0 28 28"
                height="28"
                viewBox="0 0 512 512"
                width="28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d="m497 471.833h-482c-8.284 0-15-6.716-15-15v-305.266c0-8.284 6.716-15 15-15h482c8.284 0 15 6.716 15 15v305.267c0 8.284-6.716 14.999-15 14.999z"
                    fill="#ede6e6"
                  />
                  <path
                    d="m512 456.833v-305.266c0-8.284-6.716-15-15-15h-241v335.267h241c8.284-.001 15-6.716 15-15.001z"
                    fill="#dfd7d7"
                  />
                  <path
                    d="m440.619 42.407c-4.422-2.733-9.945-2.981-14.594-.657l-170.025 85.012-170.025-85.012c-4.649-2.325-10.172-2.076-14.594.657s-7.114 7.561-7.114 12.76v313.3c0 5.682 3.21 10.875 8.292 13.417l176.733 88.367c2.117 1.059 4.415 1.583 6.708 1.583s4.591-.525 6.708-1.583l176.733-88.367c5.082-2.541 8.292-7.735 8.292-13.417v-313.3c0-5.199-2.692-10.027-7.114-12.76z"
                    fill="#faf5f5"
                  />
                  <path
                    d="m439.441 381.883c5.082-2.541 8.292-7.735 8.292-13.417v-313.3c0-5.199-2.692-10.027-7.114-12.76s-9.945-2.981-14.594-.657l-170.025 85.013v345.071c2.292 0 4.591-.525 6.708-1.583z"
                    fill="#ede6e6"
                  />
                  <path d="m432.733 368.467h.01z" />
                  <g fill="#00366d">
                    <path d="m198.441 176.308-48.2-24.1c-7.408-3.705-16.42-.702-20.125 6.708s-.701 16.419 6.708 20.125l48.2 24.1c7.408 3.705 16.42.702 20.125-6.708s.702-16.419-6.708-20.125z" />
                    <path d="m198.441 254.634-48.2-24.1c-7.408-3.705-16.42-.702-20.125 6.708s-.701 16.419 6.708 20.125l48.2 24.1c7.408 3.705 16.42.702 20.125-6.708 3.705-7.411.702-16.42-6.708-20.125z" />
                    <path d="m198.441 332.958-48.2-24.1c-7.408-3.705-16.42-.702-20.125 6.708s-.701 16.419 6.708 20.125l48.2 24.1c7.408 3.705 16.42.702 20.125-6.708s.702-16.42-6.708-20.125z" />
                  </g>
                  <path
                    d="m313.559 176.308 48.2-24.1c7.408-3.705 16.42-.702 20.125 6.708s.701 16.419-6.708 20.125l-48.2 24.1c-7.408 3.705-16.42.702-20.125-6.708s-.702-16.419 6.708-20.125z"
                    fill="#01223c"
                  />
                  <path
                    d="m313.559 254.634 48.2-24.1c7.408-3.705 16.42-.702 20.125 6.708s.701 16.419-6.708 20.125l-48.2 24.1c-7.408 3.705-16.42.702-20.125-6.708-3.705-7.411-.702-16.42 6.708-20.125z"
                    fill="#01223c"
                  />
                  <path
                    d="m313.559 332.958 48.2-24.1c7.408-3.705 16.42-.702 20.125 6.708s.701 16.419-6.708 20.125l-48.2 24.1c-7.408 3.705-16.42.702-20.125-6.708s-.702-16.42 6.708-20.125z"
                    fill="#01223c"
                  />
                </g>
              </svg>
            </Link>
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
          </React.Fragment>
        }
      />
      <div className="full-minus-header">
        <PageLink to="spotify" bg={spotifyGif}>
          <img
            className="object-cover w-1/3 mx-auto opacity-50 hover:opacity-100 transition-opacity ease-in-out duration-200"
            src={spotifyLogoGif}
          />
        </PageLink>

        <PageLink to="soundcloud" bg={soundCloudGif}>
          SoundCloud
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

import React from 'react';
import { observer } from 'mobx-react-lite';
import Header from '../components/Header';
import { useMst } from '../models';
import Toggle from '../components/ui/Toggle';
import clsx from 'clsx';

// TODO: parse the api key forms into separate small components to be reused in
// each options own settings screen (i.e. spotify settings vs YT settings)
// FIXME:
export default observer(() => {
  const store = useMst();

  const { youtube, local } = store.player;
  const theme = localStorage.getItem('theme');

  function toggleTheme() {
    const theme = localStorage.getItem('theme');

    if (!theme || theme === 'light') {
      // store.player.setTheme('dark');
      document.querySelector('html')?.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      // store.player.setTheme('light');
      document.querySelector('html')?.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }

  return (
    <div className="dark:bg-dark h-screen">
      <Header title="Settings" dark={false} />
      TODO: prompt user as to why they may need any of these, so they are
      informed as to what they are and if they need them
      <div className="p-6 flex flex-col space-y-5">
        {/* <Toggle
          enabled={theme === 'dark'}
          onToggle={toggleTheme}
          title="Dark Theme"
          dark={theme === 'dark'}
        /> */}

        <div>
          <label
            className={clsx(
              theme === 'dark' ? 'text-white' : 'text-gray-700',
              'block text-sm leading-5 font-medium '
            )}
          >
            Google API Key
          </label>

          <input
            className="form-input w-full mt-1 rounded-md border border-gray-300 px-4 py-2 text-sm leading-5"
            type="password"
            placeholder="Enter your google API key here"
            value={youtube.googleApiKey}
            onChange={(e) => youtube.setApiKey(e.target.value)}
          />
        </div>

        <div>
          <label
            className={clsx(
              theme === 'dark' ? 'text-white' : 'text-gray-700',
              'block text-sm leading-5 font-medium '
            )}
          >
            Local Library
          </label>

          <input
            className="form-input w-full mt-1 rounded-md border border-gray-300 px-4 py-2 text-sm leading-5"
            type="text"
            placeholder="Enter your local library path here"
            value={local.path}
            onChange={(e) => local.setPath(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
});

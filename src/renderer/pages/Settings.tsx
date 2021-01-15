import React from 'react';
import { observer } from 'mobx-react-lite';
import Header from '../components/Header';
import Switch from '../components/ui/Switch';
import { useMst } from '../../models';
import Input from '../components/ui/Input';

export default observer(() => {
  const store = useMst();

  const { youtube, local, theme } = store.player;

  function toggleTheme() {
    console.log('toggle');
    const theme = localStorage.getItem('theme');

    if (!theme || theme === 'light') {
      store.player.setTheme('dark');
      document.querySelector('html')?.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      store.player.setTheme('light');
      document.querySelector('html')?.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }

  return (
    <div className="dark:bg-dark-900 h-screen">
      <Header title="Settings" />

      <div className="p-6 flex flex-col space-y-5">
        <Switch
          label="Dark Mode"
          onToggle={toggleTheme}
          enabled={theme === 'dark'}
        />

        <Input
          label="Google Api Key"
          type="password"
          placeholder="Enter your google API key here"
          value={youtube.googleApiKey}
          onChange={(e) => youtube.setApiKey(e.target.value)}
        />

        <Input
          label="Local Library"
          type="text"
          placeholder="Enter your local library path here"
          value={local.path}
          onChange={(e) => local.setPath(e.target.value)}
        />
      </div>
    </div>
  );
});

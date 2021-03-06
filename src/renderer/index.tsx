import './index.css';
import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';
import ToastManager from './components/ToastManager';
import YouTube from './pages/YouTube';
import LocalLibrary from './pages/LocalLibrary';
import { initTheme } from './utils/initTheme';
import { Provider } from '../models';

require('dotenv').config();

initTheme();

// TODO: code split!!

function App() {
  return (
    <Provider>
      <ToastManager>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/youtube/*" element={<YouTube />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/library/*" element={<LocalLibrary />} />
          </Routes>
        </MemoryRouter>
      </ToastManager>
    </Provider>
  );
}

render(<App />, document.getElementById('app'));

import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../components/Header';
import { useMst } from '../../models';
import * as mm from 'music-metadata';
import Playlist, { AudioFile } from '../../components/LocalLibrary/Playlist';
import LocalPlayer from '../../components/LocalLibrary/LocalPlayer';

const fs = require('fs');
const path = require('path');

const parseAsAudio = async (files: any[]) => {
  const audioData: any[] = [];

  for (const file of files) {
    const metadata: mm.IAudioMetadata = await mm.parseFile(file, {
      skipCovers: true,
    });
    audioData.push({
      metadata,
      path: file,
    });
  }
  return audioData;
};

const scanFiles = (filepath: string, filelist: any[]) => {
  const files = fs.readdirSync(filepath);
  filelist = filelist || [];
  files.forEach((file: any) => {
    if (fs.statSync(path.join(filepath, file)).isDirectory()) {
      filelist = scanFiles(path.join(filepath, file), filelist);
    } else {
      if (
        file.endsWith('.mp3') ||
        file.endsWith('.m4a') ||
        file.endsWith('.webm') ||
        file.endsWith('.wav') ||
        file.endsWith('.aac') ||
        file.endsWith('.ogg') ||
        file.endsWith('.opus')
      ) {
        filelist.push(path.join(filepath, file));
      }
    }
  });
  return filelist;
};

function Home() {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [isInvalidPath, setIsInvalidPath] = useState<boolean>(false);
  const store = useMst();
  const { local } = store.player;

  useEffect(() => {
    if (local.path && local.path !== '') {
      try {
        const loadedFiles = scanFiles(local.path, []);
        parseAsAudio(loadedFiles).then((audioData) => {
          setAudioFiles(audioData);
        });
      } catch (e) {
        console.error(e);
        setIsInvalidPath(true);
      }
    } else {
      setIsInvalidPath(true);
    }
  }, []);

  const dark = store.player.theme === 'dark';

  return (
    <div className={clsx(dark && 'bg-dark', 'min-h-screen')}>
      <Header title="Library" dark={dark} />
      <div className={clsx(dark && 'text-white', 'text-center mt-6')}>
        {isInvalidPath ? (
          'Your local library path is invalid. Please check your settings page.'
        ) : (
          <Playlist audio={audioFiles} />
        )}
      </div>
    </div>
  );
}

export default function () {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <LocalPlayer loaded />
    </React.Fragment>
  );
}

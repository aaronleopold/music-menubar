import React from 'react';
import mm from 'music-metadata';

export type AudioFile = {
  metadata: mm.IAudioMetadata;
  path: string;
};

export type LocalPlaylist = {
  audio: AudioFile[];
};

export default function Playlist({ audio }: LocalPlaylist) {
  return (
    <React.Fragment>
      {audio.map((file) => (
        <div key={file.path}>
          <div>
            <span>
              <b>Title: </b>
              {file.metadata.common.title}
            </span>
          </div>
          <div>
            <span>
              <b>Artist: </b>
              {file.metadata.common.artist}
            </span>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}

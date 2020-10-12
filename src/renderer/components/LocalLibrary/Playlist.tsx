import React from "react";
import * as mm from "music-metadata";

type AudioFile = {
  metadata: mm.IAudioMetadata;
  path: string;
};

type LocalPlaylist = {
  audio: AudioFile[];
};

export default function Playlist({ audio }: LocalPlaylist) {
  return (
    <>
      <div>Your Library</div>
      {audio.map((file) => (
        <>
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
          <br></br>
        </>
      ))}
    </>
  );
}

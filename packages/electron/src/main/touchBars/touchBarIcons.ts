import { nativeImage } from "electron";

export const enum TouchBarIcons {
  Play = "play",
  Pause = "pause",
  Rewind = "rewind",
  FastForward = "fast-forward",
}

// TODO: memoization would be cool in here!
export const getTouchBarIcon = (name: TouchBarIcons): nativeImage =>
  nativeImage
    .createFromPath(`${__dirname}/../assets/touchbar/${name}.png`)
    .resize({ height: 30 });

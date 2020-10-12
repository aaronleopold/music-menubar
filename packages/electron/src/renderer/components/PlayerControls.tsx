import React from "react";
import { TouchBarPlayerControls } from "./TouchBarPlayerControls";
import {
  IKeyboardControlsProps,
  KeyboardControls,
} from "./utils/keyboardControls/KeyboardControls";
import { KeyboardEventTypes } from "./utils/keyboardControls/KeyboardEventTypes";

type Controls = {
  playing: boolean;
  onPlay(): void;
  onPause(): void;
  onSkip?(): void;
  onReplay?(): void;
};

export default function PlayerControls({
  playing,
  onPlay,
  onPause,
  onSkip,
  onReplay,
}: Controls) {
  function toggle() {
    if (playing) {
      onPause();
    } else {
      onPlay();
    }
  }

  const keyboardMappings = getKeyboardMapping(toggle, onReplay, onSkip);

  return (
    <div>
      <TouchBarPlayerControls
        playing={playing}
        toggle={toggle}
        onReplay={onReplay}
        onSkip={onSkip}
      />
      <KeyboardControls {...keyboardMappings} />
      <div className="absolute inset-x-0 bottom-0  py-2 ">
        <div className="flex space-x-4 justify-center items-center pb-2 text-white text-shadow-lg">
          {onReplay && (
            <button onClick={onReplay}>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="rewind w-12 h-12 hoverable"
              >
                <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
              </svg>
            </button>
          )}

          <button onClick={toggle}>
            {playing ? (
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="pause w-12 h-12 hoverable"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="play w-12 h-12 hoverable"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          {onSkip && (
            <button onClick={onSkip}>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="fast-forward w-12 h-12 hoverable"
              >
                <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
              </svg>
            </button>
          )}
        </div>
        {/* <div className="px-6 pb-4">
          <Line percent={percentListened} strokeColor="#4a5568" />
        </div> */}
      </div>
    </div>
  );
}

const getKeyboardMapping = (
  toggle: () => any,
  onReplay: () => any = () => {},
  onSkip: () => any = () => {}
): IKeyboardControlsProps => ({
  mappings: new Map<
    KeyboardEventTypes,
    Map<string, (event: KeyboardEvent) => any>
  >([
    [
      "keyup",
      new Map<string, (event: KeyboardEvent) => any>([
        [" ", toggle],
        ["ArrowLeft", onReplay],
        ["ArrowRight", onSkip],
      ]),
    ],
  ]),
});

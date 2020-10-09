import React from "react";
import { ipcPlayerMessages } from "../../ipcMessages/ipcPlayerMessages";
import { ipcTouchbarMessage } from "../../ipcMessages/ipcTouchbarMessage";
import {
  ITouchBarMessageHandler,
  TouchBarListener,
} from "./utils/touchBarManager/TouchBarListener";

interface ITouchBarControls {
  playing: boolean;
  toggle(): void;
  onSkip?(): void;
  onReplay?(): void;
}

/** This component is pretty specific: it represents the touchbar controls listener and it is made to go on pair
 *  with the PlayerControls right now. It can of course be extended, but it's not so generic that it can be considered an util.
 */
export const TouchBarPlayerControls: React.FunctionComponent<ITouchBarControls> = ({
  playing,
  onReplay,
  onSkip,
  toggle,
}) => {
  const emptyFunction = () => {};

  // set touchbar
  const touchBarType = playing
    ? ipcTouchbarMessage.SET_PLAYER_TOUCHBAR_PAUSE
    : ipcTouchbarMessage.SET_PLAYER_TOUCHBAR_PLAY;

  const handlers: ITouchBarMessageHandler[] = [
    {
      message: ipcPlayerMessages.PLAYER_REPLAY,
      handler: onReplay || emptyFunction,
    },
    { message: ipcPlayerMessages.PLAYER_TOGGLE, handler: toggle },
    {
      message: ipcPlayerMessages.PLAYER_SKIP,
      handler: onSkip || emptyFunction,
    },
  ];

  return (
    <TouchBarListener
      touchBar={touchBarType}
      handlers={handlers}
      touchBarOnExit={ipcTouchbarMessage.REMOVE_TOUCHBAR}
    />
  );
};

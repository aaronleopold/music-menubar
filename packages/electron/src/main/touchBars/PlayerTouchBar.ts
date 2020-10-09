import { getTouchBarIcon, TouchBarIcons } from "./TouchBarIcons";
import { mainWindow } from "./../index";
import { TouchBar } from "electron";
import { ipcPlayerMessages } from "../../ipcMessages/ipcPlayerMessages";
const { TouchBarButton } = TouchBar;

export const PlayerTouchBar = (isPlaying: boolean) => {
  const playStatus: TouchBarIcons = isPlaying
    ? TouchBarIcons.Pause
    : TouchBarIcons.Play;

  return new TouchBar({
    items: [
      new TouchBarButton({
        icon: getTouchBarIcon(TouchBarIcons.Rewind),
        iconPosition: "overlay",
        click: () =>
          mainWindow.webContents.send(ipcPlayerMessages.PLAYER_REPLAY),
      }),
      new TouchBarButton({
        icon: getTouchBarIcon(playStatus),
        iconPosition: "overlay",
        click: () =>
          mainWindow.webContents.send(ipcPlayerMessages.PLAYER_TOGGLE),
      }),
      new TouchBarButton({
        icon: getTouchBarIcon(TouchBarIcons.FastForward),
        iconPosition: "overlay",
        click: () => mainWindow.webContents.send(ipcPlayerMessages.PLAYER_SKIP),
      }),
    ],
  });
};

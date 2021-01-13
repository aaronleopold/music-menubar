import { mainWindow } from '../index';
import { ipcMain, TouchBar } from 'electron';
import { PlayerTouchBar } from './PlayerTouchBar';
import { ipcTouchbarMessage } from '../ipc/ipcTouchbarMessage';

export const manageTouchBars = () =>
  mapTouchBar.forEach((value, key) =>
    ipcMain.on(key, () => mainWindow.setTouchBar(value))
  );

const mapTouchBar = new Map<ipcTouchbarMessage, TouchBar>([
  [ipcTouchbarMessage.REMOVE_TOUCHBAR, new TouchBar({})],
  [ipcTouchbarMessage.SET_PLAYER_TOUCHBAR_PLAY, PlayerTouchBar(false)],
  [ipcTouchbarMessage.SET_PLAYER_TOUCHBAR_PAUSE, PlayerTouchBar(true)],
]);

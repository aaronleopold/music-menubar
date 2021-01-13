import { ipcRenderer } from 'electron';
import React from 'react';
import { useEffect } from 'react';
import { ipcPlayerMessages } from '../../../main/ipc/ipcPlayerMessages';
import { ipcTouchbarMessage } from '../../../main/ipc/ipcTouchbarMessage';

export type ITouchBarMessageHandler = {
  message: ipcPlayerMessages;
  handler: (event: Electron.IpcRendererEvent, ...args: any[]) => void;
};

export interface ITouchBarListenerProps {
  touchBar: ipcTouchbarMessage;
  handlers: ITouchBarMessageHandler[];
  touchBarOnExit?: ipcTouchbarMessage;
}

export const TouchBarListener: React.FunctionComponent<ITouchBarListenerProps> = ({
  touchBar,
  handlers,
  touchBarOnExit,
}) => {
  useEffect(() => {
    ipcRenderer.send(touchBar);

    handlers.forEach((handler) =>
      ipcRenderer.on(handler.message, handler.handler)
    );

    return () => {
      if (touchBarOnExit != undefined) {
        ipcRenderer.send(touchBarOnExit);
      }

      handlers.forEach((handler) =>
        ipcRenderer.removeListener(handler.message, handler.handler)
      );
    };
  });

  return <></>;
};

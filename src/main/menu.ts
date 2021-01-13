import { platform } from "os";
import { Menu } from "electron";
import { Menubar } from "menubar";
import open from "open";

const VERSION = require("../../package.json").version;

export function addContextmenu(menubar: Menubar) {
  if (!menubar) return;

  let template = [
    {
      label: `About MusicMenubar v${VERSION}`,
      click: () => open("www.github.com/aaronleopold/music-menubar"),
    },
    { type: "separator" },
    {
      label: "Platform: " + platform,
    },
    {
      label: "Toggle Dev Tools",
      click: () => menubar?.window?.webContents.openDevTools(),
    },
    { type: "separator" },

    { label: "Quit", role: "quit" },
  ];

  menubar.tray.on("right-click", function () {
    const contextMenu = Menu.buildFromTemplate(template as any);
    Menu.setApplicationMenu(contextMenu);
    menubar.tray.popUpContextMenu(contextMenu);
  });
}

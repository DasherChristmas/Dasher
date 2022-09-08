import { app, ipcMain, Menu } from 'electron';
import { getAppConfig } from './appConfig';
import { appConfigChannels, titleBarChannels } from './channels';
import { windowEventTarget, windowState } from './getWindowState';
// eslint-disable-next-line
import { mainWindow } from './main'; // Creates a dependency cycle, which eslint hates XD.

const appConfig = getAppConfig();

/* ------------------------------ Title Bar IPC ----------------------------- */

windowEventTarget.on('change', () => {
  mainWindow?.webContents.send(
    windowState.maximized
      ? titleBarChannels.maximize
      : titleBarChannels.unmaximize
  );
});

ipcMain.handle(titleBarChannels.getWindowState, () => {
  return windowState;
});

ipcMain.on(titleBarChannels.maximize, () => {
  mainWindow?.maximize();
});
ipcMain.on(titleBarChannels.unmaximize, () => {
  mainWindow?.unmaximize();
});
ipcMain.on(titleBarChannels.minimize, () => {
  mainWindow?.minimize();
});
ipcMain.on(titleBarChannels.quit, () => {
  app.quit();
});

type SerializedMenuItem = {
  menu: undefined;
  submenu?: SerializedMenu;
  [key: string]: any;
};
interface SerializedMenu {
  items: SerializedMenuItem[];
}

const serializeMenu = (menu: Electron.Menu): SerializedMenu => {
  return {
    items: menu.items.map(
      (item): SerializedMenuItem => ({
        ...item,
        menu: undefined,
        submenu: item.submenu ? serializeMenu(item.submenu) : undefined,
        click: undefined,
      })
    ),
  };
};

ipcMain.handle(titleBarChannels.getMenu, () => {
  return serializeMenu(Menu.getApplicationMenu()!);
});

ipcMain.on(titleBarChannels.menuAction, (_, cid: number) => {
  const findItemIn = (menu: Electron.Menu) => {
    for (const item of menu.items) {
      if (item.commandId === cid) {
        item.click();
        return true;
      }

      if (item.submenu && findItemIn(item.submenu)) return true;
    }

    return false;
  };

  findItemIn(Menu.getApplicationMenu()!);
});

/* -------------------------- App Configuration IPC ------------------------- */
ipcMain.handle(appConfigChannels.getConfig, () => {
  return appConfig;
});
ipcMain.on(
  appConfigChannels.setProperty,
  <P extends keyof typeof appConfig>(
    _: Electron.IpcMainEvent,
    propertyName: P,
    value: typeof appConfig[P]
  ) => {
    appConfig[propertyName] = value;
  }
);

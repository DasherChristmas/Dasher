import { app, BrowserWindow, dialog, ipcMain, Menu, shell } from 'electron';
import TypedEmitter from '../common/typedEmitter';
import { getAppConfig, setConfig } from './appConfig';
import {
  appConfigChannels,
  titleBarChannels,
  mainProcessChannels,
  appStateChannels,
} from './channels';
import { getControllers, saveControllers } from './controllers';
import { Controller } from '../renderer/types';
import { windowEventTarget, windowState } from './getWindowState';

import { mainWindow } from './main';

const appConfig = getAppConfig();

type MPC = typeof mainProcessChannels;
type IpcEvents = {
  [key in MPC[keyof MPC]]: [string];
};
const ipcEmitter = new TypedEmitter<IpcEvents>();

export default ipcEmitter;

/* ---------------------------- Main Process IPC ---------------------------- */
ipcEmitter.on(mainProcessChannels.openSequence, (path) => {
  mainWindow?.webContents.send(mainProcessChannels.openSequence, path);
});

let progressBarMode: 'normal' | 'indeterminate' | 'error' | 'paused' = 'normal';
let progressBarProgress = -1;
ipcMain.on(mainProcessChannels.setProgress, (_, progress) => {
  mainWindow?.setProgressBar((progressBarProgress = progress), {
    mode: progressBarMode,
  });
});
ipcMain.on(mainProcessChannels.setProgressMode, (_, mode) => {
  mainWindow?.setProgressBar(progressBarProgress, {
    mode: (progressBarMode = mode),
  });
});
ipcEmitter.on(mainProcessChannels.openSettings, () => {
  mainWindow?.webContents.send(mainProcessChannels.openSettings);
});
ipcMain.on(mainProcessChannels.openFolder, (_, folder: string) => {
  shell.openPath(folder);
});

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

/* ------------------------------ App State IPC ----------------------------- */
ipcMain.handle(appStateChannels.getDirectory, () => {
  return appConfig.rootDir;
});

const loadNewDirectory = (dir: string) => {
  BrowserWindow.getFocusedWindow()?.webContents.send(
    appStateChannels.setDirectory,
    dir
  );
};

ipcMain.on(appStateChannels.setDirectory, async (_, permenant: boolean) => {
  const selected = await dialog.showOpenDialog(
    BrowserWindow.getFocusedWindow()!,
    {
      buttonLabel: 'Select directory',
      defaultPath: appConfig.rootDir,
      title: 'Select new root directory',
      properties: ['openDirectory', 'dontAddToRecent', 'promptToCreate'],
    }
  );
  const dir = selected.filePaths[0];
  if (!dir) return;

  loadNewDirectory(dir);
  if (permenant) {
    appConfig.rootDir = dir;
    setConfig(appConfig);
    saveControllers(getAppConfig().rootDir, getControllers(appConfig.rootDir));
  }
});

ipcMain.handle(appStateChannels.getControllers, () => {
  return getControllers(getAppConfig().rootDir);
});
ipcMain.on(appStateChannels.setControllers, (_, controllers: Controller[]) => {
  saveControllers(getAppConfig().rootDir, controllers);
});

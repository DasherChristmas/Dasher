/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

import './ipc';
import './state';
import {
  loadMainWindowState,
  setMainWindowState,
  windowState,
} from './getWindowState';
import { platform } from 'os';
import createDebug from '../common/debug';

const debug = createDebug('Main Process', '#0000ff');

loadMainWindowState();

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

export let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')({
    showDevTools: false,
  });
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) =>
        typeof name === 'string' ? installer[name] : name
      ),
      forceDownload
    )
    .catch(debug.warn);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    ...windowState,
    titleBarStyle: platform() === 'darwin' ? 'default' : 'hidden',
    icon: getAssetPath('icon.png'),
    minHeight: 600,
    minWidth: 600,
    webPreferences: {
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      if (windowState.main.maximized) mainWindow.maximize();
      mainWindow.on('moved', () => {
        const newPosition = mainWindow?.getPosition();
        if (!newPosition) return;

        const [x, y] = newPosition;
        windowState.main.x = x;
        windowState.main.y = y;

        setMainWindowState(windowState);
      });
      mainWindow.on('resized', () => {
        const newSize = mainWindow?.getSize();
        if (!newSize) return;

        const [width, height] = newSize;
        windowState.main.width = width;
        windowState.main.height = height;

        setMainWindowState(windowState);
      });
      mainWindow.on('maximize', () => {
        windowState.main.maximized = true;

        setMainWindowState(windowState);
      });
      mainWindow.on('unmaximize', () => {
        windowState.main.maximized = false;
        setMainWindowState(windowState);
      });
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  new AppUpdater();
};

export let previewWindow: BrowserWindow | null = null;

const createPreviewWindow = async () => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  previewWindow = new BrowserWindow({
    show: false,
    ...windowState,
    titleBarStyle: platform() === 'darwin' ? 'default' : 'hidden',
    icon: getAssetPath('icon.png'),
    minHeight: 400,
    minWidth: 400,
    webPreferences: {
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  previewWindow.loadURL(`${resolveHtmlPath('index.html')}#/preview`);

  previewWindow.on('ready-to-show', () => {
    if (!previewWindow) {
      throw new Error('"previewWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      previewWindow.minimize();
    } else {
      previewWindow.show();
      if (windowState.main.maximized) previewWindow.maximize();
      previewWindow.on('moved', () => {
        const newPosition = previewWindow?.getPosition();
        if (!newPosition) return;

        const [x, y] = newPosition;
        windowState.preview.x = x;
        windowState.preview.y = y;

        setMainWindowState(windowState);
      });
      previewWindow.on('resized', () => {
        const newSize = previewWindow?.getSize();
        if (!newSize) return;

        const [width, height] = newSize;
        windowState.preview.width = width;
        windowState.preview.height = height;

        setMainWindowState(windowState);
      });
      previewWindow.on('maximize', () => {
        windowState.preview.maximized = true;

        setMainWindowState(windowState);
      });
      previewWindow.on('unmaximize', () => {
        windowState.preview.maximized = false;
        setMainWindowState(windowState);
      });
    }
  });

  previewWindow.on('closed', () => {
    previewWindow = null;
  });

  const menuBuilder = new MenuBuilder(previewWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  previewWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(debug.warn);

if (!app.requestSingleInstanceLock()) app.quit();

import { app, BrowserWindow } from "electron";
import electronReload from "electron-reload";

electronReload(__dirname, {
  electron: require(`${__dirname}/../node_modules/electron`)
});

app.whenReady().then(() => {
  let loader = new BrowserWindow({
    width: 300,
    height: 500,
    frame: false,
    transparent: true
  });
  loader.loadFile(`./dist/pages/loader/index.html`);

  const mainWindow = new BrowserWindow({
    show: false
  });

  mainWindow.webContents.on("did-finish-load", () => {
    loader && loader.close();
    mainWindow.show();
  });

  mainWindow.loadFile("./dist/pages/main/index.html");
});

import electron from "electron";
const { app, BrowserWindow } = electron;

console.log(electron);

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 300,
    height: 500
  });
  win.loadFile("./pages/loader/index.html");
});

import { atom } from 'recoil';
import { ipcRenderer } from 'electron';
import { appStateChannels } from '../main/channels';

export const directoryState = atom({
  key: 'directoryState',
  default: '',
  effects: [
    ({ setSelf, onSet }) => {
      ipcRenderer
        .invoke('appstate:getDirectory')
        .then((dir: string) => {
          onSet((newValue) => {
            ipcRenderer.send(appStateChannels.setDirectory, newValue);
          });
          return setSelf(dir);
        })
        .catch(() => {});

      const setListener = (_: Electron.IpcRendererEvent, dir: string) => {
        setSelf(dir);
      };

      ipcRenderer.on(appStateChannels.setDirectory, setListener);

      return () => ipcRenderer.off(appStateChannels.setDirectory, setListener);
    },
  ],
});

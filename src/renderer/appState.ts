import { atom } from 'recoil';
import { ipcRenderer } from 'electron';
import remote from '@electron/remote';
import { Controller } from './types';
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

export const controllersState = atom<Controller[]>({
  key: 'controllersState',
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      ipcRenderer
        .invoke('appstate:getControllers')
        .then((controllers: Controller[]) => {
          setSelf(controllers);
          return onSet((newValue) => {
            ipcRenderer.send(appStateChannels.setControllers, newValue);
          });
        })
        .catch(() => {});
    },
  ],
});

export const selectedControllerState = atom<number>({
  key: 'selectedControllerState',
  default: -1,
});

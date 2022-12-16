import { atom } from 'recoil';
import { ipcRenderer } from 'electron';
import { Controller } from '../../types';
import createDebug from '../../../common/debug';

const debug = createDebug('Controllers State', '#059669');

export const controllersState = atom<Controller[]>({
  key: 'controllersState',
  default: [],
  effects: [
    ({ setSelf }) => {
      ipcRenderer
        .invoke('appstate:getControllers')
        .then((controllers: Controller[]) => {
          setSelf(controllers);
        })
        .catch(() => {});
    },
  ],
});

export const selectedControllerState = atom<number>({
  key: 'selectedControllerState',
  default: -1,
});

export const hasControllerChangesState = atom<boolean>({
  key: 'hasControllerChangesState',
  default: false,
});

export const portState = atom<string[]>({
  key: 'portsState',
  default: [],
  effects: [
    ({ setSelf }) => {
      debug.debug('Getting ports');
      ipcRenderer
        .invoke('appstate:getPorts')
        .then((ports: string[]) => {
          setSelf(ports);
        })
        .catch(() => {});
    },
  ],
});

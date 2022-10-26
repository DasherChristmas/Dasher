import { atom, useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { ipcRenderer } from 'electron';
import TypedEmitter from '../../common/typedEmitter';
import { titleBarChannels } from '../../main/channels';

export const maximizedState = atom({
  key: 'windowMaximized',
  default: false,
});

export const menuState = atom({
  key: 'appMenu',
  default: {
    items: [],
  } as Partial<Electron.Menu>,
});

export const titleState = atom({
  key: 'appTitle',
  default: 'Dasher Sequencer',
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        document.title = newValue;
      });
    },
  ],
});

export const titleEmitter = new TypedEmitter<{
  setTitle: [string];
}>();

const TitleBarStateNode: React.FC = () => {
  const [, setMaximized] = useRecoilState(maximizedState);
  const [, setMenu] = useRecoilState(menuState);
  const [, setTitle] = useRecoilState(titleState);
  useEffect(() => {
    const maximizeListener = () => setMaximized(true);
    ipcRenderer.on(titleBarChannels.minimize, () => maximizeListener);
    const unmaximizeListener = () => setMaximized(false);
    ipcRenderer.on(titleBarChannels.unmaximize, unmaximizeListener);

    ipcRenderer
      .invoke(titleBarChannels.getMenu)
      .then((newMenu) => setMenu(newMenu))
      .catch(() => {});
    ipcRenderer
      .invoke(titleBarChannels.getWindowState)
      .then((windowState) => setMaximized(windowState.maximized))
      .catch(() => {});

    const titleListener = (title: string) => {
      setTitle(title);
    };

    titleEmitter.on('setTitle', titleListener);

    return () => {
      ipcRenderer.off(titleBarChannels.maximize, maximizeListener);
      ipcRenderer.off(titleBarChannels.unmaximize, unmaximizeListener);
      titleEmitter.off('setTitle', titleListener);
    };
  }, [setMaximized, setMenu, setTitle]);
  return null;
};

export default TitleBarStateNode;

import { atom, useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { mainProcessChannels, titleBarChannels } from '../../main/channels';

const { ipcRenderer } = window.electron;

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

const TitleBarStateNode: React.FC = () => {
  const [maximized, setMaximized] = useRecoilState(maximizedState);
  const [menu, setMenu] = useRecoilState(menuState);
  useEffect(() => {
    const removeMaximizeListener = ipcRenderer.on(
      titleBarChannels.maximize,
      () => setMaximized(true)
    );
    const removeUnmaximizeListener = ipcRenderer.on(
      titleBarChannels.unmaximize,
      () => setMaximized(false)
    );

    ipcRenderer
      .invoke('titlebar:getMenu')
      .then((newMenu) => setMenu(newMenu))
      .catch(() => {});
    ipcRenderer
      .invoke('titlebar:getWindowState')
      .then((windowState) => setMaximized(windowState.maximized))
      .catch(() => {});

    return () => {
      removeMaximizeListener?.();
      removeUnmaximizeListener?.();
    };
  }, [setMaximized, setMenu]);
  return null;
};

export default TitleBarStateNode;

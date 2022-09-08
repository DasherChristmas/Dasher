import { atom, useRecoilState } from 'recoil';
import { useEffect } from 'react';
import TypedEmitter from '../../common/typedEmitter';

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

export const titleState = atom({
  key: 'appTitle',
  default: 'Dasher Sequencer',
});

export const titleEmitter = new TypedEmitter<{
  setTitle: [string];
}>();

const TitleBarStateNode: React.FC = () => {
  const [, setMaximized] = useRecoilState(maximizedState);
  const [, setMenu] = useRecoilState(menuState);
  const [, setTitle] = useRecoilState(titleState);
  useEffect(() => {
    const removeMaximizeListener = ipcRenderer.on('titlebar:maximize', () =>
      setMaximized(true)
    );
    const removeUnmaximizeListener = ipcRenderer.on('titlebar:unmaximize', () =>
      setMaximized(false)
    );

    ipcRenderer
      .invoke('titlebar:getMenu')
      .then((newMenu) => setMenu(newMenu))
      .catch(() => {});
    ipcRenderer
      .invoke('titlebar:getWindowState')
      .then((windowState) => setMaximized(windowState.maximized))
      .catch(() => {});

    const titleListener = (title: string) => {
      setTitle(title);
    };

    titleEmitter.on('setTitle', titleListener);

    return () => {
      removeMaximizeListener?.();
      removeUnmaximizeListener?.();
      titleEmitter.off('setTitle', titleListener);
    };
  }, [setMaximized, setMenu, setTitle]);
  return null;
};

export default TitleBarStateNode;

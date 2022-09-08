import { atom, useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import AppConfig from '../common/appConfig';
import { appConfigChannels } from '../main/channels';

const { ipcRenderer } = window.electron;

// eslint-disable-next-line
export let appConfig: AppConfig;
export const appConfigAtom = atom({
  key: 'appConfig',
  default: {} as AppConfig,
});

function postLoad() {}

export async function loadAppConfig(): Promise<void> {
  appConfig = await ipcRenderer.invoke(appConfigChannels.getConfig);
  postLoad();
}

const eventTarget = new EventTarget();

export function setConfigProperty<P extends keyof AppConfig>(
  property: P,
  value: AppConfig[P]
) {
  appConfig = {
    ...appConfig,
    [property]: value,
  };
  ipcRenderer.sendMessage('appconfig:setProperty', property, value);
  eventTarget.dispatchEvent(new CustomEvent('change'));
}

(window as any).setConfigProperty = setConfigProperty;

const AppConfigStateNode: React.FC = () => {
  const [currentAppConfig, setAppConfig] = useRecoilState(appConfigAtom);
  const [onConfigChange] = useState(() => () => {
    setAppConfig({ ...appConfig });
  });
  useEffect(() => {
    setAppConfig(appConfig);
    eventTarget.addEventListener('change', onConfigChange);

    return () => {
      eventTarget.removeEventListener('change', onConfigChange);
    };
  }, [onConfigChange, setAppConfig]);
  return null;
};

export default AppConfigStateNode;

import path from 'path';
import { useEffect } from 'react';
import { Box, Film, Icon, Settings, Sliders } from 'react-feather';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ipcRenderer } from 'electron';

import TypedEmitter from '../../common/typedEmitter';

import './Tabs.scss';
import { mainProcessChannels } from '../../main/channels';

const dasherTabs: {
  icon: Icon;
  path: string;
}[] = [
  {
    icon: Sliders,
    path: '/controllers',
  },
  {
    icon: Box,
    path: '/models',
  },
  {
    icon: Film,
    path: '/sequencer',
  },
  {
    icon: Settings,
    path: '/settings',
  },
];

const tabEmitter = new TypedEmitter<{
  setPath: [string];
}>();

const Tab: React.FC<{ tab: typeof dasherTabs[number] }> = ({ tab }) => {
  const location = useLocation();
  return (
    <Link
      to={tab.path}
      className={`Tab ${location.pathname === tab.path ? 'selected' : ''}`}
      tabIndex={-1}
    >
      <tab.icon size="1.5em" />
    </Link>
  );
};

const Tabs: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const pathListener = (route: string) => {
      navigate(route);
    };

    tabEmitter.on('setPath', pathListener);

    const openSettingsListener = () => {
      navigate('/settings');
    };
    ipcRenderer.on(mainProcessChannels.openSettings, openSettingsListener);

    return () => {
      tabEmitter.off('setPath', pathListener);
      ipcRenderer.off(mainProcessChannels.openSettings, openSettingsListener);
    };
  }, [navigate]);
  return (
    <div className="TabsContainer">
      <div className="TabsList">
        {dasherTabs.map((tab) => (
          <Tab tab={tab} key={tab.path} />
        ))}
      </div>
    </div>
  );
};

export default Tabs;

import path from 'path';
import { useEffect } from 'react';
import { Box, Film, Icon, Settings, Sliders } from 'react-feather';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TypedEmitter from '../../common/typedEmitter';

import './Tabs.scss';

const { ipcRenderer } = window.electron;

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

    const openSettingsListener = ipcRenderer.on(
      'mainprocess:openSettings',
      () => {
        navigate('/settings');
      }
    );

    return () => {
      tabEmitter.off('setPath', pathListener);
      openSettingsListener?.();
    };
  }, [navigate]);
  return (
    <div className="TabsContainer">
      <div className="TabsList">
        {dasherTabs.map((tab) => (
          <Tab tab={tab} />
        ))}
      </div>
    </div>
  );
};

export default Tabs;
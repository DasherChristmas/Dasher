import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.scss';
import AppConfigStateNode from './appConfig';
import StatusBar from './statusbar/StatusBar';
import Tabs from './tabs/Tabs';
import TitleBar from './titlebar/TitleBar';

const Temp = () => {
  return null;
};

export default function App() {
  return (
    <RecoilRoot>
      <TitleBar />
      <Router>
        <div className="AppContainer">
          <Tabs />
          <Routes>
            <Route path="/" element={<Navigate to="/controllers" />} />
            <Route path="/controllers" element={<Temp />} />
          </Routes>
        </div>
      </Router>
      <StatusBar />
      <AppConfigStateNode />
    </RecoilRoot>
  );
}

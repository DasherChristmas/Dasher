import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.style.scss';
import AppConfigStateNode from './appConfig';
import Controllers from './pages/controllers/Controllers';
import Models from './pages/models/Models';
import StatusBar from './statusbar/StatusBar';
import Tabs from './tabs/Tabs';
import TitleBar from './titlebar/TitleBar';

export default function App() {
  return (
    <RecoilRoot>
      <TitleBar />
      <Router>
        <div className="AppContainer">
          <Tabs />
          <Routes>
            <Route path="/" element={<Navigate to="/controllers" />} />
            <Route path="/controllers" element={<Controllers />} />
            <Route path="/models" element={<Models />} />
          </Routes>
        </div>
      </Router>
      <StatusBar />
      <AppConfigStateNode />
    </RecoilRoot>
  );
}

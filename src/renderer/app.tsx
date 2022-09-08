import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { RecoilRoot } from 'recoil';
import './App.css';
import AppConfigStateNode from './appConfig';
import TitleBar from './titlebar/TitleBar';

const Hello = () => {
  return <div></div>;
};

export default function App() {
  return (
    <RecoilRoot>
      <TitleBar />
      <Router>
        <Routes>
          <Route path="/" element={<Hello />} />
        </Routes>
      </Router>
      <AppConfigStateNode />
    </RecoilRoot>
  );
}

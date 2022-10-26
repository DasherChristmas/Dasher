import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useMemo } from 'react';
import './Modal.scss';

const modalState = atom<{
  [key: string]: { priority: number; children: React.ReactNode };
}>({
  key: 'modalState',
  default: {},
});

let modalsGlobal: {
  [key: string]: { priority: number; children: React.ReactNode };
} = {};

export const ModalRoot: React.FC = () => {
  const modals = useRecoilValue(modalState);
  useEffect(() => {
    modalsGlobal = { ...modals };
  }, [modals]);
  return Object.keys(modals).length === 0 ? null : (
    <div className="ModalContainer">
      {Object.entries(modals)
        .sort((a, b) => a[1].priority - b[1].priority)
        .map(([name, { children }]) => (
          <div className="Modal" key={`${name}`}>
            <div>{children}</div>
          </div>
        ))}
    </div>
  );
};

export const Modal: React.FC<{
  children: React.ReactNode;
  name: string;
  priority: number;
}> = ({ children, name, priority }) => {
  const [modals, setModals] = useRecoilState(modalState);
  useEffect(() => {
    const newModals = { ...modals };

    newModals[name] = {
      priority,
      children,
    };

    setModals(newModals);

    return () => {
      const tempModals = { ...modalsGlobal };
      delete tempModals[name];
      setModals(tempModals);
    };
  }, [children, name, priority, setModals]);
  return null;
};

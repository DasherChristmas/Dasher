import fs from 'fs';
import path from 'path';
import EventEmitter from 'events';
import paths from './paths';

export const windowEventTarget = new EventEmitter();

export let windowState: {
  main: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    maximized?: boolean;
  };
  preview: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    maximized?: boolean;
  };
} = {
  main: {
    height: 600,
    width: 800,
  },
  preview: {
    height: 600,
    width: 800,
  },
};

export function setMainWindowState(
  state: typeof windowState,
  suppress = false
) {
  windowState = {
    ...windowState,
    ...state,
  };
  if (!suppress) windowEventTarget.emit('change');
  fs.writeFile(
    path.join(paths.appData, 'windowState.json'),
    JSON.stringify(state),
    () => {}
  );
}

export function loadMainWindowState() {
  try {
    const fileBuffer = fs.readFileSync(
      path.join(paths.appData, 'windowState.json')
    );
    const newWindowState = JSON.parse(fileBuffer.toString('utf-8'));
    if (!('main' in newWindowState)) {
      setMainWindowState({
        main: newWindowState,
        preview: windowState.preview,
      });
    } else {
      setMainWindowState(newWindowState);
    }
  } catch {
    setMainWindowState(windowState, true);
  }
}

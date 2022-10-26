import fs from 'fs';
import path from 'path';
import EventEmitter from 'events';
import paths from './paths';

export const windowEventTarget = new EventEmitter();

export let windowState: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  maximized?: boolean;
} = {
  height: 600,
  width: 800,
};

export function setWindowState(
  state: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    maximized?: boolean;
  },
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

export function loadWindowState() {
  try {
    const fileBuffer = fs.readFileSync(
      path.join(paths.appData, 'windowState.json')
    );
    windowState = JSON.parse(fileBuffer.toString('utf-8'));
  } catch {
    setWindowState(windowState, true);
  }
}

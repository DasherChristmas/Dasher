import path from 'path';
import fs from 'fs';
import { Controller } from '../renderer/types';

const defaultControllers: Controller[] = [];

export function saveControllers(showDir: string, controllers: Controller[]) {
  fs.writeFile(
    path.join(showDir, 'controllers.json'),
    JSON.stringify(controllers),
    () => {}
  );
}

export function getControllers(showDir: string): Controller[] {
  try {
    const fileBuffer = fs.readFileSync(path.join(showDir, 'controllers.json'));
    const controllerList = JSON.parse(fileBuffer.toString('utf-8'));
    return controllerList;
  } catch {
    const controllerList = [...defaultControllers];
    saveControllers(showDir, controllerList);
    return controllerList;
  }
}

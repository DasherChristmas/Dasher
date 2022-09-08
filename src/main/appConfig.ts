import fs from 'fs';
import path from 'path';
import paths from './paths';

import AppConfig from '../common/appConfig';

const defaultConfig: AppConfig = {
  darkColorScheme: true,
};

function validate(config: any): config is AppConfig {
  if (
    !('darkColorScheme' in config) ||
    typeof config.darkColorScheme !== 'boolean'
  )
    return false;

  return true;
}

export function setConfig(config: AppConfig) {
  fs.writeFile(
    path.join(paths.appData, 'config.json'),
    JSON.stringify(config),
    () => {}
  );
}

export function getAppConfig(): AppConfig {
  try {
    const fileBuffer = fs.readFileSync(path.join(paths.appData, 'config.json'));
    const config = JSON.parse(fileBuffer.toString('utf-8'));
    return validate(config) ? config : { ...defaultConfig };
  } catch {
    const config = { ...defaultConfig };
    setConfig(config);
    return config;
  }
}

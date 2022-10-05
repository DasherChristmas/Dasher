import fs from 'fs';
import path from 'path';
import paths from './paths';

import AppConfig from '../common/appConfig';
import { L10N } from '../common/l10n';

const defaultConfig: AppConfig = {
  editorConfig: path.join(paths.appData, 'default.dasherconfig'),
  rootDir: paths.appData,
  loc: 'en',
};

const validate = (config: any): config is AppConfig =>
  typeof config === 'object' &&
  'editorConfig' in config &&
  typeof config.editorConfig === 'string' &&
  'rootDir' in config &&
  typeof config.rootDir === 'string' &&
  'loc' in config &&
  L10N.supportedLocales.includes(config.loc);

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

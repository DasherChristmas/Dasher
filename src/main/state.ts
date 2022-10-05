import { getAppConfig } from './appConfig';
import { getControllers } from './controllers';

// Initialize the configs
const config = getAppConfig();
getControllers(config.rootDir);

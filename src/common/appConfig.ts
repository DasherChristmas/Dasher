import { L10N } from './l10n';

export default interface AppConfig {
  editorConfig: string;
  rootDir: string;
  loc: L10N.Locale;
}

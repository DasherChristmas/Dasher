import fs from 'fs/promises';
import TypedEmitter from './typedEmitter';

export class L10N {
  constructor(protected locale: L10N.Locale = 'en') {}

  setLocale(loc: L10N.Locale) {
    this.locale = loc;
  }

  getMessage(
    name: string,
    opts: {
      number: number;
      [key: string]: string | bigint | number | boolean | undefined;
    } = { number: 0 }
  ): string {
    if (!L10N.localeIsLoaded(this.locale)) L10N.loadLocale(this.locale);

    const msgDef = L10N.locales.loaded[this.locale]?.[name];

    const format = (placeholders: string[], string: string) => {
      for (const placeholder of placeholders.concat(['number'])) {
        string.replaceAll(`{${placeholder}}`, opts[placeholder] as string);
      }

      return string;
    };

    if (!msgDef) return name;
    // eslint-disable-next-line no-else-return
    else if (typeof msgDef === 'string') return msgDef;
    else
      return format(
        msgDef.placeholders,
        opts.number === 1 ? msgDef.singular : msgDef.plural
      );
  }
}
export namespace L10N {
  export const supportedLocales = ['en'] as const;
  export type Locale = typeof supportedLocales[number];

  class LocaleDict extends TypedEmitter<{
    load: [Locale];
  }> {
    readonly loaded: Partial<
      Record<
        Locale,
        {
          [msg: string]:
            | string
            | {
                placeholders: string[];
                singular: string;
                plural: string;
              };
        }
      >
    > = {};

    loadLocale(
      loc: Locale,
      msgs: {
        [msg: string]:
          | string
          | {
              placeholders: string[];
              singular: string;
              plural: string;
            };
      }
    ) {
      this.loaded[loc] = msgs;
    }
  }

  export const locales = new LocaleDict();
  let locale: Locale = 'en';

  export const globalLocale = () => locale;
  export const setGlobalLocale = (loc: Locale) => {
    locale = loc;
  };

  export const loadLocale = async (loc: Locale): Promise<void> => {
    locales.loadLocale(
      loc,
      ((await import(`../../l10n/${loc}.json`)) as { default: any }).default
    );
  };

  export const localeIsLoaded = (loc: Locale) => loc in locales.loaded;

  export const getMessage: typeof L10N.prototype.getMessage = (name, opts) =>
    new L10N().getMessage(name, opts);
}

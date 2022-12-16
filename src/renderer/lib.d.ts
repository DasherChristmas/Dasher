import type { EffectDefinition } from '@dasherchristmas/dasher-render';

declare global {
  interface Window {
    dasher:
      | {
          methods: {
            registerEffectGroup: (
              name: string,
              effects: EffectDefinition[]
            ) => void;
            setSettingsEnabled: (
              groupName: string,
              effectName: string,
              optionName: string,
              enabled: boolean
            ) => void;
            getSettingValue: <T>(
              groupName: string,
              effectName: string,
              optionName: string
            ) => T;
          };
        }
      | undefined;
  }
}

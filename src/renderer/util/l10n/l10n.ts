import { atom, useRecoilValue } from 'recoil';
import { useMemo } from 'react';
import memoizee from 'memoizee';
import { L10N } from '../../../common/l10n';

const l10nState = atom<{
  locale: L10N.Locale;
}>({
  key: 'l10nState',
  default: {
    locale: 'en',
  },
  effects: [
    ({ getLoadable, setSelf }) => {
      const listener = () => {
        const v = getLoadable(l10nState).getValue();
        setSelf({
          locale: v.locale,
        }); // We just want it to update
      };

      L10N.locales.on('load', listener);

      return () => L10N.locales.off('load', listener);
    },
  ],
});

const useL10N = () => {
  const l10nData = useRecoilValue(l10nState);
  const l10n = useMemo(() => new L10N(l10nData.locale), [l10nData.locale]);
  const msg = useMemo(() => l10n.getMessage.bind(l10n), [l10n]);

  return msg;
};

export default useL10N;

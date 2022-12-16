const buildChannelsObject = <N extends string, C extends string>(
  name: N,
  channels: readonly C[]
): {
  [key in C]: `${N}:${key}`;
} =>
  Object.fromEntries(
    channels.map((channel) => [channel, `${name}:${channel}`])
  ) as {
    [key in C]: `${N}:${key}`;
  };

type ChannelList<C extends object> = C[keyof C];

export const titleBarChannels = buildChannelsObject('titlebar', [
  'getMenu',
  'menuAction',
  'maximize',
  'unmaximize',
  'minimize',
  'quit',
  'getWindowState',
]);

export const appConfigChannels = buildChannelsObject('appconfig', [
  'getConfig',
  'setProperty',
]);

export const mainProcessChannels = buildChannelsObject('mainprocess', [
  'openSequence',
  'setProgress',
  'setProgressMode',
  'openSettings',
  'openFolder',
]);

export const appStateChannels = buildChannelsObject('appstate', [
  'getDirectory',
  'setDirectory',
  'getControllers',
  'setControllers',
  'getPorts',
]);

export const windowStateChannels = buildChannelsObject('windowstate', [
  'showPreview',
  'hidePreview',
  'openPreview',
  'closePreview',
]);

type Channels =
  | ChannelList<typeof titleBarChannels>
  | ChannelList<typeof appConfigChannels>
  | ChannelList<typeof mainProcessChannels>
  | ChannelList<typeof appStateChannels>
  | ChannelList<typeof windowStateChannels>;

export default Channels;

import advatek from './advatek.json';
import entec from './entec.json';
import espixelstick from './espixelstick.json';
import falcon from './falcon.json';
import fpp from './fpp.json';
import hanson from './hanson.json';
import hinkspix from './hinkspix.json';
import twinkly from './twinkly.json';

const protocols = [
  'twinkly',
  'qed3110',
  'dmx',
  'renard',
  'ws2811',
  'tm18xx',
  'lx1203',
  'ws2801',
  'tls3001',
  'lpd6803',
  'gece',
  'lpd8806',
  'apa102',
  'ucs2903',
  'tm1814a',
  'e131',
  'artnet',
  'zcpp',
  'ddp',
  'apa109',
  'sm16716',
  'tm1814',
  'tm1829',
  'ucs8903',
  'ucs8903 16 bit',
  'ucs8904',
  'ucs8904 16 bit',
  'ws2811 slow',
  'dmx512p',
  'dmx512p-4',
  'sj1221',
  'tm1803',
  'tm1804',
  'tm1809',
  'tm1914',
  'apa104',
  'dmx512',
  'sm16703',
  'sm16704',
  'sm16714',
  'mbi6020',
  'my9231',
  'my9221',
  'my9291',
  'sk6812',
  'sk6813',
  'sk6822',
  'sk9822',
  'ucs1903',
  'ucs2904',
  'ucs9812',
  'gs8208',
  'p9813',
  'mb16020',
  'tlc5973',
  'tm1812',
  '9pdot',
  '9pdot (16)',
  'spxl',
  'spxl (16)',
  'opendmx',
  'genericserial',
  'lor',
  'pixelnet',
  'pixelnet-open',
  'ddp-input',
  'dmx-pro',
  'dmx-open',
  'pixelnet-lynx',
  'lor optimised',
  'ccr',
  'ccb',
  'gs820x',
  'rgb+',
  'rgbw+',
  'rgb+2',
  'rm2021',
] as const;

export type Protocol = typeof protocols[number];

export interface SerializedVariant {
  name: string;
  extends?: string;
  webUI?: boolean;
  upload?: boolean;
  inputOnlyUpload?: boolean;
  autoUpload?: boolean;
  pixelPortCommonSettings?: boolean;
  pixelZigZag?: boolean;
  maxZigZag?: number;
  fullControl?: boolean;
  multipleSimulOutProtocols?: boolean;
  multipleSimulInProtocols?: boolean;
  ledPanelMatrix?: boolean;
  allInputUniversesSameSize?: boolean;
  virtualStrings?: boolean;
  autoLayout?: boolean;
  mergeConsecutiveVirtStrings?: boolean;
  remotes?: boolean;
  defaultBrightness?: boolean;
  maxInputUniverses?: number;
  maxSerialPortChannels?: number;
  serialProtocols?: string[];
  pixelProtocols?: string[];
  inputProtocols?: string[];
  maxPixelPortChannels?: number;
  allSmartRemoteTypesPerPortSame?: boolean;
  smartRemotes?: number;
  needsDDPInputUpload?: boolean;
  smartRemoteTypes?: string[];
  maxPixelPort?: number;
  maxSerialPort?: number;
  banks?: number;
  bankSize?: number;
  maxStartNulls?: number;
  maxEndNulls?: number;
  maxGroup?: number;
  minGroup?: number;
  needsFullUniverseForSerial?: boolean;
  allInputUniversesMustBe510?: boolean;
  forceExpanded?: boolean;
  pixelPortGrouping?: boolean;
  pixelPortColorOrder?: boolean;
  maxInputUniverseChannels?: number;
  minInputUniverseChannels?: number;
  universesMustBeSequential?: boolean;
  pixelPortEndNullPixels?: boolean;
  universesMustBeInNumericalOrder?: boolean;
  defaultGamma?: boolean;
  preferredInputProtocol?: string;
  virtualMatrix?: boolean;
  pixelPortBrightness?: boolean;
  pixelPortGamma?: boolean;
  pixelPortNullPixels?: boolean;
  pixelPortDirection?: boolean;
  universePerString?: boolean;
  dmxAfterPixels?: boolean;
  [k: string]: unknown;
}
export interface Variant extends SerializedVariant {
  serialProtocols?: Protocol[];
  pixelProtocols?: Protocol[];
  inputProtocols?: Protocol[];
  preferredInputProtocol: Protocol;
}
export interface SerializedController {
  name: string;
  variants: SerializedVariant[];
  [k: string]: unknown;
}
export interface Controller extends SerializedController {
  variants: Variant[];
}
export interface SerializedControllerSet {
  vendor: string;
  abstractVariants?: SerializedVariant[];
  controllers: SerializedController[];
  [k: string]: unknown;
}
export interface ControllerSet extends SerializedControllerSet {
  abstractVariants?: Variant[];
  controllers: Controller[];
}

const configure = (
  set: SerializedControllerSet,
  abstractVariants: SerializedVariant[]
): Omit<ControllerSet, 'abstractVariants'> => {
  const newSet = { ...set };
  delete newSet.abstractVariants;

  newSet.controllers = newSet.controllers.map((c) => ({
    ...c,
    variants: c.variants.map((v) => {
      return {
        ...(abstractVariants?.find((av) => av.name === v.extends) || {}),
        ...v,
      } as Variant;
    }),
  }));

  return newSet;
};

const configureAll = <V extends Record<string, SerializedControllerSet>>(
  vendors: V
) => {
  const abstractVariants = Object.entries(vendors).flatMap(([, controllers]) =>
    (controllers.abstractVariants || [])
      .map((av) => ({
        ...av,
        name: `${controllers.vendor}:${av.name}`,
      }))
      .map((v, _, abstracts) => {
        return {
          ...(abstracts?.find((av) => av.name === v.extends) || {}),
          ...v,
        } as Variant;
      })
  );
  return Object.fromEntries(
    Object.entries(vendors).map(([vend, controllers]) => [
      vend,
      configure(controllers, abstractVariants),
    ])
  ) as Record<keyof V, ControllerSet>;
};

export default {
  vendors: configureAll({
    advatek,
    entec,
    espixelstick,
    falcon,
    fpp,
    hanson,
    hinkspix,
    twinkly,
  } as const),
  protocols,
};

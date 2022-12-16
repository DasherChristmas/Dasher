export default function createDebug(
  name: string,
  color: `#${string}`
): Console {
  return {
    ...console,
    log(...a) {
      console.log(`%c[${name}]`, `color:${color}; font-weight:bold`, ...a);
    },
    warn(...a) {
      console.warn(`%c[${name}]`, `color:${color}; font-weight:bold`, ...a);
    },
    error(...a) {
      console.error(`%c[${name}]`, `color:${color}; font-weight:bold`, ...a);
    },
    debug(...a) {
      console.debug(`%c[${name}]`, `color:${color}; font-weight:bold`, ...a);
    },
  };
}

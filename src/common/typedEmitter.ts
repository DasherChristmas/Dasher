import EventEmitter from 'events';

type EventMap = {
  [eventName: string | symbol]: unknown[];
};

export default class TypedEmitter<E extends EventMap> extends EventEmitter {
  on<N extends keyof E>(eventName: N, listener: (...args: E[N]) => void) {
    return super.on(
      eventName as string | symbol,
      listener as (...args: unknown[]) => void
    );
  }

  off<N extends keyof E>(eventName: N, listener: (...args: E[N]) => void) {
    return super.off(
      eventName as string | symbol,
      listener as (...args: unknown[]) => void
    );
  }

  once<N extends keyof E>(eventName: N, listener: (...args: E[N]) => void) {
    return super.once(
      eventName as string | symbol,
      listener as (...args: unknown[]) => void
    );
  }

  emit<N extends keyof E>(eventName: N, ...args: E[N]): boolean {
    return super.emit(eventName as string | symbol, ...args);
  }
}

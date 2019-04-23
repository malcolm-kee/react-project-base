interface CallBack<Params extends any[]> {
  (...args: Params): void;
}

export const callAll = <Params extends any[]>(...fns: Array<CallBack<Params> | undefined>) => (
  ...args: Params
) => fns.forEach(fn => typeof fn === 'function' && fn(...args));

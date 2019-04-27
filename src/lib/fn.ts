interface CallBack<Params extends any[]> {
  (...args: Params): void;
}

export const callAll = <Params extends any[]>(
  ...fns: Array<CallBack<Params> | undefined>
) => (...args: Params) =>
  fns.forEach(fn => typeof fn === 'function' && fn(...args));

export const createNumberArray = (length: number, startFrom = 0) => {
  const result: number[] = [];
  for (let index = startFrom; index < length; index++) {
    result.push(index);
  }
  return result;
};

export function noop() {}

export function isNil(val: any): val is undefined | null {
  return typeof val === 'undefined' || val === null;
}

export function isDefined<T>(val: T | undefined | null): val is T {
  return !isNil(val);
}

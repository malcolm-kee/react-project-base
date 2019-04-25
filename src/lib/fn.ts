interface CallBack<Params extends any[]> {
  (...args: Params): void;
}

export const callAll = <Params extends any[]>(...fns: Array<CallBack<Params> | undefined>) => (
  ...args: Params
) => fns.forEach(fn => typeof fn === 'function' && fn(...args));

export const createNumberArray = (length: number) => {
  const result: number[] = [];
  for (let index = 0; index < length; index++) {
    result.push(index);
  }
  return result;
};

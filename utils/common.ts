export function throttle<F extends (...args: any[]) => void>(func: F, wait: number): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let timer: NodeJS.Timeout | null = null;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func.apply(context, args);
      timer = null;
    }, wait);
  };
}
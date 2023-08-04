import { CSSProperties } from 'react';
import { DONATE_SDK_URL } from './const';

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

export const getDonatePreviewSrcDoc = (l: string) => {
  return `<html><head></head><body style="padding-top: 30px;">${l}</body></html>`;
};

export const getDonateUrl = (cid: string, isSrcDoc?: boolean) => {
  return `<div data-donate3-cid="${cid}" ${isSrcDoc ? 'data-donate3-demo="true"' : ''}></div><script src="${DONATE_SDK_URL}"></script>`;
};

export const getDonateSrcDoc = (cid: string) => {
  return getDonatePreviewSrcDoc(getDonateUrl(cid));
};

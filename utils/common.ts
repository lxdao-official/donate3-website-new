import { CSSProperties } from 'react';
import { DONATE_SDK_URL, EType } from './const';
import { ICustomWidget } from '@/components/CustomWidget';

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

export const getDonatePreviewSrcDoc = (element: string) => {
  return `<html><head></head><body style="padding-top: 30px;">${element}</body></html>`;
};

export const getDonateUrl = (cid: string, isSrcDoc?: boolean) => {
  return `<div data-donate3-cid="${cid}" ${isSrcDoc ? 'data-donate3-demo="true"' : ''}></div><script src="${DONATE_SDK_URL}"></script>`;
};

export const getDonateSrcDoc = (cid: string) => {
  return getDonatePreviewSrcDoc(getDonateUrl(cid));
};

export const getDynamicDonateUrl = (info: Partial<ICustomWidget>) => {
  const { accountType, address, avatar, color, description, name, safeAccounts, telegram, twitter, type } = info;
  return `<div 
     data-donate3-type="${EType[type!]}"
     data-donate3-to-address="${address}"
     data-donate3-color="${color}"
     data-donate3-title="${name}"
     data-donate3-demo="true"
     data-donate3-avatar="${avatar}"
     data-donate3-safeAccounts="${safeAccounts && JSON.stringify(safeAccounts)}"
    ></div>
    <script src="${DONATE_SDK_URL}"></script>`;
};

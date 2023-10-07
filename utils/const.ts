export const DONATE_SDK_LATEST_VERSION = '1.0.33';

export const DONATE_SDK_URL = `/bundle-solana.js`;

export const DEFAULT_CREATE_NAME = 'Donate3-solana';
export const DEFAULT_CREATE_COLOR = '#b9e927';
export const DEFAULT_CREATE_ADDRESS = 'G6P6s2UgbNFFXrqEq7oCx48uP1abXWoZU86SaaTCnoGS';

export enum AccountType {
  'solana',
}
export enum AccountProgressType {
  'WithProgress',
  'WithoutProgress',
}
// export interface SafeAccount {
//   networkId: number;
//   address: `0x${string}` | undefined;
// }
export const DEFAULT_CREATE_CONFIG = {
  type: 0,
  color: DEFAULT_CREATE_COLOR,
  name: DEFAULT_CREATE_NAME,
  accountType: AccountType.solana,
  progressType: AccountProgressType.WithoutProgress,
  address: DEFAULT_CREATE_ADDRESS,
  safeAccounts: [{ networkId: 5, address: undefined }],
  avatar: '',
  description: '',
  twitter: '',
  telegram: '',
  fundsGoal: 0,
  startTime: 0,
  endTime: 0,
  reason: '',
  previousCid: '',
};

export enum EType {
  'float' = 0,
  'embed',
}

export const DEFAULT_CID = 'bafkreiav5wlxi5dwlg74747mtsqmpkfuuykbmhwvn7ibmtpa3uydtu57m4';

export const ZERO_ADDRESS = '11111111111111111111111111111111';

export const PRODUCTION_URL = 'https://www.donate3.xyz';

export const DEFAULT_PREVIOUS_LINK = `${PRODUCTION_URL}/donateTo?cid=`;

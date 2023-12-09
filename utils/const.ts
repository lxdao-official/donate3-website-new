export const DONATE_SDK_LATEST_VERSION = '1.0.44';

// export const DONATE_SDK_URL = `https://cdn.jsdelivr.net/npm/donate3-sdk@${DONATE_SDK_LATEST_VERSION}/dist/webpack/bundle.js`;

export const DONATE_SDK_URL = '/webpack/bundle.js';
export const DEFAULT_CREATE_NAME = 'Donate3';
export const DEFAULT_CREATE_COLOR = '#b9e927';
export const DEFAULT_CREATE_ADDRESS = '0xe395B9bA2F93236489ac953146485C435D1A267B';

export enum AccountType {
  'EOA',
  'safeAccount',
}
export enum AccountProgressType {
  'WithProgress',
  'WithoutProgress',
}
export interface SafeAccount {
  networkId: number;
  address: `0x${string}` | undefined;
}
export const DEFAULT_CREATE_CONFIG = {
  type: 0,
  color: DEFAULT_CREATE_COLOR,
  name: DEFAULT_CREATE_NAME,
  accountType: AccountType.EOA,
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

export const DEFAULT_CID = 'bafkreibnfk3tnrmqpgn2b3ynqo7lp7wcolrynuspq54o2dwp25dshmmmou';

export const DEFAULT_ADDRESS = '0x11478E001E70e70A80654A820e4c947b68E970d8';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const PRODUCTION_URL = 'https://www.donate3.xyz';

export const DEFAULT_PREVIOUS_LINK = `${PRODUCTION_URL}/donateTo?cid=`;

export const DONATE_SDK_LATEST_VERSION = '1.0.7';

export const DONATE_SDK_URL = `https://cdn.jsdelivr.net/npm/donate3-sdk@${DONATE_SDK_LATEST_VERSION}/dist/webpack/bundle.js`;

export const DEFAULT_CREATE_NAME = 'Donate3';
export const DEFAULT_CREATE_COLOR = '#396AFF';
export const DEFAULT_CREATE_ADDRESS = '0xe395B9bA2F93236489ac953146485C435D1A267B';

export enum AccountType {
  'EOA',
  'safeAccount',
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
  address: DEFAULT_CREATE_ADDRESS,
  safeAccounts: [{ networkId: 1, address: undefined }],
  avatar: '',
  description: '',
  twitter: '',
  telegram: '',
};

export enum EType {
  'float' = 0,
  'embed',
}

export const DEFAULT_CID = 'bafkreienpukipwckf4g3jcgti7tgvbh5hz7kuubo3pyufjbdzrv6sv5dlm';

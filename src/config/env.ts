import { Address, zeroAddress } from 'viem';
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'Donation';

export const WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? 'N/A';

export const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ?? 'N/A';

export const ENABLE_TESTNETS =
  process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ?? false;

export const DONATION_ADDRESS =
  (process.env.NEXT_PUBLIC_DONATION_ADDRESS as Address) ??
  (zeroAddress as Address);

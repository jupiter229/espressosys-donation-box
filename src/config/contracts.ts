import { zeroAddress } from 'viem';
import { DONATION_ADDRESS } from './env';
import { ChainAddress } from './types/contract';
import { SupportedChain } from './wagmi';

export const DonationContractAddress: ChainAddress = {
  [SupportedChain.MAINNET]: zeroAddress,
  [SupportedChain.SEPOLIA]: DONATION_ADDRESS,
};

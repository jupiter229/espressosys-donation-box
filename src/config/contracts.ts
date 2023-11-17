import { zeroAddress } from 'viem';
import { ChainAddress } from './types/contract';
import { SupportedChain } from './wagmi';
import { DONATION_ADDRESS } from './env';

export const DonationContractAddress: ChainAddress = {
  [SupportedChain.MAINNET]: zeroAddress,
  [SupportedChain.SEPOLIA]: DONATION_ADDRESS,
};

import { Address } from 'viem';
import { SupportedChainId } from '../wagmi';

export type ChainAddress = {
  [chainId in SupportedChainId]: Address;
};

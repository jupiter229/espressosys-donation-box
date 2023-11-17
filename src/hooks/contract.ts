import {
  SupportedChainId,
} from '@/config';
import { DONATION_ABI } from '@/config';
import { DonationContractAddress } from '@/config/contracts';
import { ChainAddress } from '@/config/types';
import { Abi, Address, parseAbiItem } from 'viem';
import { useChainId, useContractRead, usePublicClient } from 'wagmi';
import { getContract } from '@wagmi/core';

export const useContractConfig = <T extends Abi>(
  chainAdress: ChainAddress,
  abi: T,
) => {
  const chainId = useChainId();
  const address = chainAdress[chainId as SupportedChainId];

  return {
    address,
    abi,
  };
};

export const useDonationContractConfig = () => {
  return useContractConfig(DonationContractAddress, DONATION_ABI);
};

export const useDonationContract = () => {
  const { address, abi } = useDonationContractConfig();
  return getContract({
    address: address,
    abi: abi,
  });
}

export const useTotalDonations = () => {
  const { address, abi } = useDonationContractConfig();
  const { data, isError, isLoading } = useContractRead({
    address: address,
    abi: abi,
    functionName: 'getTotalDonations',
  })

  return {
    total: data,
    isError,
    isLoading,
  };
}

export const useUserTotalDonations = (address: Address, userAddress?: Address) => {
  
  const publicClient = usePublicClient();
  const getLogs = async () => {
    try {
      if(address === undefined || userAddress === undefined) return BigInt(0);
      const res = await publicClient.getLogs({
        address: address,
        event: parseAbiItem('event DonationTransferred(address sender, uint amount)'),
        fromBlock: 3551931n,
      });

      const myDonation = res
        .filter(item => item.args.sender === userAddress)
        .reduce((acc, item) => {
          const amount = item.args.amount ?? BigInt(0);
          return acc + amount;
        }, BigInt(0));

      return myDonation;
    } catch (error) {
      // Handle errors (e.g., log them or show a notification)
      console.error("Error fetching logs:", error);
      return BigInt(0); // or handle errors in a way that makes sense for your application
    }
  };

  return getLogs;
};

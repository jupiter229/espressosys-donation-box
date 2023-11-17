import {
  connectorsForWallets,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  ledgerWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy'

import { APP_NAME, ENABLE_TESTNETS, ALCHEMY_API_KEY, WALLET_CONNECT_PROJECT_ID } from './env';

export const SupportedChain = {
  MAINNET: mainnet.id,
  SEPOLIA: sepolia.id,
};

export const CHAINS = [mainnet, ...(ENABLE_TESTNETS ? [sepolia] : [])];
export const CHAIN_IDS = CHAINS.map(({ id }) => id);
export type SupportedChainId = (typeof CHAIN_IDS)[number];

const { chains, publicClient, webSocketPublicClient } = configureChains(
  CHAINS,
  [
    alchemyProvider({apiKey: ALCHEMY_API_KEY} ),
    publicProvider()],
);

const projectId = WALLET_CONNECT_PROJECT_ID;

export const { wallets } = getDefaultWallets({
  appName: APP_NAME,
  projectId,
  chains,
});

export const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default wagmiConfig;

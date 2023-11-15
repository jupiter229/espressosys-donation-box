'use client';

import { CHAINS, RAINBOWKIT_CUSTOM_THEME, wagmiConfig } from '@/config';
import { useMounted } from '@/hooks';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { FC, PropsWithChildren } from 'react';
import { WagmiConfig } from 'wagmi';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  const mounted = useMounted();
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={CHAINS}
        theme={RAINBOWKIT_CUSTOM_THEME}
        showRecentTransactions
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Providers;

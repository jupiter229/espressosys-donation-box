'use client';

import { twclsx } from '@/utils';
import {
  ConnectButton,
  useChainModal,
  useConnectModal,
} from '@rainbow-me/rainbowkit';
import { ComponentProps, FC } from 'react';
import { useAccount, useNetwork } from 'wagmi';

interface IProps extends ComponentProps<'button'> {}

export const ConnectWallet: FC<IProps> = ({
  className,
  children,
  ...props
}) => {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();

  const unsupported = chain?.unsupported ?? false;

  return isConnected && !unsupported ? (
    <ConnectButton />
  ) : (
    <button
      onClick={unsupported ? openChainModal : openConnectModal}
      className={twclsx(
        'btn w-full max-w-[240px]',
        unsupported ? 'btn-error' : 'btn-primary',
        className,
      )}
      {...props}
    >
      {chain?.unsupported ? 'Wrong Network' : children ?? 'Connect Wallet'}
    </button>
  );
};

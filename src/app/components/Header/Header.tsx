
import { ConnectWallet } from '@/components';
import { twclsx } from '@/utils';
import Link from 'next/link';
import { ComponentProps, FC } from 'react';

interface IProps extends ComponentProps<'header'> {}

export const Header: FC<IProps> = ({ className, ...props }) => {
  return (
    <header className={twclsx('z-10', className)} {...props}>
      <nav className="navbar h-full flex w-full grow items-center justify-end max-h-24 px-14">
        
        <div className="navbar-end">
          <ConnectWallet />
        </div>
      </nav>
    </header>
  );
};

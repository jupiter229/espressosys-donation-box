
import { ConnectWallet } from '@/components';
import { twclsx } from '@/utils';
import Link from 'next/link';
import { ComponentProps, FC } from 'react';

interface IProps extends ComponentProps<'header'> {}

export const Header: FC<IProps> = ({ className, ...props }) => {
  return (
    <header className={twclsx('z-10', className)} {...props}>
      <nav className="navbar h-full max-h-24 px-14">
        <ul className="flex w-full grow items-center justify-center gap-10 text-xs font-medium">
          {['Trade', 'Donation'].map(
            (item, idx) => (
              <li key={idx}>
                <Link href={`/${item.toLowerCase()}`}>{item}</Link>
              </li>
            ),
          )}
        </ul>
        <div className="navbar-end">
          <ConnectWallet />
        </div>
      </nav>
    </header>
  );
};

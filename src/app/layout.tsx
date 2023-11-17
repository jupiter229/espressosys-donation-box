import '@rainbow-me/rainbowkit/styles.css';
import { Montserrat } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';
import '../styles/globals.css';
import { Header } from './components/Header'
import { Providers } from './providers';
import { twclsx } from '@/utils';

const font = Montserrat({ subsets: ['latin'] });

export const metadata = {
  title: 'Donation',
  description: 'Donation',
};

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={twclsx('h-screen', font.className)}>
        <Providers>
          <Header className="h-24" />
          <div className="divider m-0 h-0 px-12" />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
};

export default Layout;

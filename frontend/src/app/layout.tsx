import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import '@/styles/globals.css';
import '@/styles/tailwind.css';

import StoreProvider from '@/store/store-provider';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movies',
  description: 'Movies',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={montserrat.className}>
          <NextTopLoader
            color="linear-gradient(112.71deg, #6200EE -43.98%, #9F3AC9 14.19%, #F98F93 101.45%)"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={2000}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />
          {children}
          <Toaster position='top-center' />
        </body>
      </StoreProvider>
    </html>
  );
}

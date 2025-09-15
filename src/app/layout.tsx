import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

import "./globals.css";


export const metadata: Metadata = {
  title: "News App",
  description: "News",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppRouterCacheProvider>
      <body>
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
      </AppRouterCacheProvider>
    </html>
  );
}

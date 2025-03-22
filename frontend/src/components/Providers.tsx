"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { networkConfig } from '@/config/networkConfig';
import '@mysten/dapp-kit/dist/index.css';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider>
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};

export default Providers;
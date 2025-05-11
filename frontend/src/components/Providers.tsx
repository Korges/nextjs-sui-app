"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { networkConfig } from "@/config/networkConfig";
import { ToastContainer } from "react-toastify";
import { NetworkType } from "@/types";


const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork={getNetwork()}>
        <WalletProvider autoConnect>
          <ToastContainer/>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};

export default Providers;

function getNetwork(): NetworkType {
  const networks = ["mainnet", "devnet", "testnet"];
  const network = process.env.NEXT_PUBLIC_NETWORK;

  if (undefined == network || !networks.includes(network)) {
    return "testnet";
  }

  return network as NetworkType;
}
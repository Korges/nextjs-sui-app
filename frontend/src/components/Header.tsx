// Required for interactive components in Next.js App Router

import Link from "next/link";
import Navbar from "./Navbar";
import { ConnectButton, ConnectModal, useCurrentAccount } from "@mysten/dapp-kit";
import { useState } from 'react';

export default function Header() {
  const currentAccount = useCurrentAccount()
  const [open, setOpen] = useState(false);

  return (
    <header className="flex flex-row items-center justify-between bg-gray-800 p-2 ">
        <Navbar />
        {/* <ConnectButton /> */}
        
        <ConnectModal 
          trigger={
            <button className="bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2 rounded text-white" disabled={!!currentAccount}> {currentAccount ? 'Connected' : 'Connect'}</button>
          }
          open={open}
          onOpenChange={(isOpen) => setOpen(isOpen)}
		/>
    </header>
  );
}

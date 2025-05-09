// Required for interactive components in Next.js App Router

import Link from "next/link";
import Navbar from "./Navbar";
import { ConnectButton, ConnectModal, useCurrentAccount } from "@mysten/dapp-kit";
import { useState } from "react";

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between bg-gray-800 p-2 ">
      <Navbar />
      <ConnectButton />
    </header>
  );
}

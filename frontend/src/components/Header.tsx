// Required for interactive components in Next.js App Router


import Navbar from "./Navbar";
import { ConnectButton } from "@mysten/dapp-kit";


export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between bg-gray-800 p-2 ">
      <Navbar />
      <ConnectButton />
    </header>
  );
}

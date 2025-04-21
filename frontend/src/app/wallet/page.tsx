"use client";
import { OwnedObjects } from "@/components/OwnedObjects";
import { useCurrentAccount } from "@mysten/dapp-kit";

const Wallet = () => {
  const account = useCurrentAccount();

  return (
    <div>
      <h1 className="text-2xl font-bold">Wallet Balance</h1>
      {account ? (
        <div>
          <p>Wallet connected</p>
          <p>Address: {account.address}</p>
        </div>
      ) : (
        <div>
          <p>Wallet not connected</p>
        </div>
      )}
      <OwnedObjects />
    </div>
  );
};

export default Wallet;

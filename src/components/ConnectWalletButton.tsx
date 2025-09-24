// src/components/ConnectWalletButton.tsx
import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";
import { shortAddress } from "../lib/wallet";
import { WalletModal } from "./WalletModal";

export const ConnectWalletButton: React.FC = () => {
  const { account } = useWallet();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
      >
        {account ? shortAddress(account) : "Connect Wallet"}
      </button>
      <WalletModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

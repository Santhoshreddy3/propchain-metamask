// src/components/WalletModal.tsx
import React from "react";
import {
  isMetaMaskInstalled,
  METAMASK_DOWNLOAD_URL,
  shortAddress,
} from "../lib/wallet";
import { useWallet } from "../context/WalletContext";

interface WalletModalProps {
  open: boolean;
  onClose: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ open, onClose }) => {
  const { account, isConnecting, error, connect } = useWallet();

  if (!open) return null;

  const installed = isMetaMaskInstalled();

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white w-96 max-w-full rounded-xl shadow-lg">
        <div className="flex justify-between items-center border-b px-4 py-3">
          <h3 className="text-lg font-medium">
            {account ? "Wallet Connected" : "Connect a Wallet"}
          </h3>
          <button onClick={onClose} className="text-xl leading-5">
            ×
          </button>
        </div>

        {/* Not installed */}
        {!installed && !account && (
          <div className="p-4">
            <p>
              MetaMask is not detected. Please{" "}
              <a
                href={METAMASK_DOWNLOAD_URL}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                install MetaMask
              </a>{" "}
              and refresh the page.
            </p>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>
        )}

        {/* Installed, not yet connected */}
        {installed && !account && (
          <div className="p-4 space-y-4">
            <button
              className="w-full flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100"
              onClick={connect}
              disabled={isConnecting}
            >
              {/* replace with your own metamask.svg if available */}
              <img src="/metamask.svg" alt="" width={24} height={24} />
              <span>MetaMask</span>
            </button>
            {error && <p className="text-red-600">{error}</p>}
          </div>
        )}

        {/* Connected: show account */}
        {account && (
          <div className="p-4 space-y-2">
            <p>Connected account:</p>
            <code className="block px-3 py-1 bg-gray-100 rounded">
              {account}
            </code>
            <p className="text-gray-600">({shortAddress(account)})</p>
            {error && <p className="text-red-600">{error}</p>}
          </div>
        )}

        <div classnName="border-t px-4 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            {account ? "Close" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};

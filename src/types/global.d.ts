// src/types/global.d.ts
interface EthereumProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<any>;
  on: (event: string, handler: (...args: any[]) => void) => void;
  removeListener: (event: string, handler: (...args: any[]) => void) => void;
  providers?: EthereumProvider[];   // support multi-provider injection (Brave/Coinbase + MetaMask)
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export {};

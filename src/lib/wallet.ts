// src/lib/wallet.ts
export const METAMASK_DOWNLOAD_URL = "https://metamask.io/download/";

type AnyEth = {
  isMetaMask?: boolean;
  request?: (args: { method: string; params?: unknown[] }) => Promise<any>;
  on?: (event: string, handler: (...args: any[]) => void) => void;
  removeListener?: (event: string, handler: (...args: any[]) => void) => void;
  providers?: AnyEth[];
};

export function getMetaMask(): AnyEth | undefined {
  // Grab window.ethereum if in browser
  const eth: AnyEth | undefined =
    typeof window !== "undefined" ? (window as any).ethereum : undefined;
  if (!eth) return undefined;

  // If multiple providers injected (Brave, Coinbase, MetaMask), pick the MetaMask one
  if (Array.isArray(eth.providers)) {
    const mm = eth.providers.find((p) => p?.isMetaMask);
    return mm ?? undefined;
  }
  // Otherwise ensure this single provider is MetaMask
  return eth.isMetaMask ? eth : undefined;
}

export function isMetaMaskInstalled() {
  return !!getMetaMask();
}

export async function getPermittedAccounts(): Promise<string[]> {
  const mm = getMetaMask();
  if (!mm?.request) return [];
  // Returns accounts already approved (no prompt)
  return mm.request({ method: "eth_accounts" });
}

export async function requestConnect(): Promise<string[]> {
  const mm = getMetaMask();
  if (!mm?.request) {
    const err: any = new Error("MetaMask not detected");
    err.code = "NO_METAMASK";
    throw err;
  }
  // Prompts the user to connect via MetaMask; may throw 4001 if cancelled
  return mm.request({ method: "eth_requestAccounts" });
}

export function shortAddress(addr?: string) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

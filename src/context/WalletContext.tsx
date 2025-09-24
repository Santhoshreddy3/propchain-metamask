// src/context/WalletContext.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getMetaMask,
  getPermittedAccounts,
  requestConnect,
} from "../lib/wallet";

interface WalletContextValue {
  account?: string;
  isConnecting: boolean;
  error?: string;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextValue | null>(null);

export const WalletProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [account, setAccount] = useState<string | undefined>();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | undefined>();

  // On mount: restore previously permitted accounts (no prompt).
  useEffect(() => {
    (async () => {
      if (!getMetaMask()) {
        setAccount(undefined);
        return;
      }
      try {
        const accs = await getPermittedAccounts();
        setAccount(accs?.[0]);
      } catch {
        setAccount(undefined);
      }
    })();
  }, []);

  // Keep the state in sync if user changes accounts or disconnects via MetaMask.
  useEffect(() => {
    const mm = getMetaMask();
    if (!mm) return;
    const onAccountsChanged = (accs: string[]) => setAccount(accs?.[0]);
    const onDisconnect = () => setAccount(undefined);

    mm.on?.("accountsChanged", onAccountsChanged);
    mm.on?.("disconnect", onDisconnect);

    return () => {
      mm.removeListener?.("accountsChanged", onAccountsChanged);
      mm.removeListener?.("disconnect", onDisconnect);
    };
  }, []);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(undefined);
    try {
      if (!getMetaMask()) {
        const err: any = new Error("MetaMask not detected.");
        err.code = "NO_METAMASK";
        throw err;
      }
      const accs = await requestConnect();
      setAccount(accs?.[0]);
    } catch (err: any) {
      if (err?.code === 4001)
        setError("Connection request was rejected by the user.");
      else if (err?.code === "NO_METAMASK")
        setError("MetaMask is not installed.");
      else setError(err?.message ?? "Failed to connect.");
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    // MetaMask has no programmatic disconnect; just clear local state
    setAccount(undefined);
    setError(undefined);
  }, []);

  const value = useMemo(
    () => ({ account, isConnecting, error, connect, disconnect }),
    [account, isConnecting, error, connect, disconnect],
  );

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error("useWallet must be used within WalletProvider");
  }
  return ctx;
}

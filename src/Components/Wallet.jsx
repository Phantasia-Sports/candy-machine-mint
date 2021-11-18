import React, {useEffect, useState} from "react";
import {
  WalletDialogProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-material-ui";
import { useWallet } from "@solana/wallet-adapter-react";

function Wallet(props) {
  const {onConnect, onDisconnect} = props;

  const wallet = useWallet();

  const [prevConnected, setPrevConnected] = useState();

  useEffect(() => {
    if (!wallet.connected && prevConnected) {
      if (onDisconnect)
        onDisconnect();
    }

    else if (!prevConnected && wallet.connected) {
      if (onConnect)
        onConnect();
    }

    setPrevConnected(wallet.connected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  return (
    <WalletDialogProvider>
      <WalletMultiButton />
    </WalletDialogProvider>
  );
}

export default Wallet;

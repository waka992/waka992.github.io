import React from "react";
import Button from "@mui/material/Button";
import "./ConnectButton.scss";
import { isWalletInfoCurrentlyEmbedded, WalletInfoCurrentlyEmbedded } from '@tonconnect/sdk';
// hook
import useTonConnect from "@/hooks/useTonConnect";

const ConnectButton = () => {
  const { connector, getWallets, connect } = useTonConnect();
  const walletsList: any = getWallets();

  const connectWallet = () => {
    // 
    const embeddedWallet = walletsList.find(
      isWalletInfoCurrentlyEmbedded
    ) as WalletInfoCurrentlyEmbedded;

    if (embeddedWallet) {
      connector.connect({ jsBridgeKey: embeddedWallet.jsBridgeKey });
      return;
    }

    const walletConnectionSource = {
      jsBridgeKey: "tonkeeper",
    };

    connector.connect(walletConnectionSource);
    const unsubscribe = connector.onStatusChange((walletInfo) => {
      console.log(walletInfo);
      // update state/reactive variables to show updates in the ui
    });
  };

  return (
    <div className="connect-button">
      <Button size="small" variant="contained" onClick={connectWallet}>
        Connect
      </Button>
    </div>
  );
};

export default ConnectButton;

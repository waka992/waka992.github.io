import React, { useEffect } from "react";
import WebApp from "@twa-dev/sdk";

import "./ConnectButton.scss";
import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import useEncrypt from "@/hooks/useEncrypt";

// hook
const ConnectButton = () => {
  const { encrypt } = useEncrypt();
  const userFriendlyAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  useEffect(
    () =>
      tonConnectUI.onStatusChange((wallet) => {
        console.log(wallet);
        if (
          wallet.connectItems?.tonProof &&
          "proof" in wallet.connectItems.tonProof
        ) {
          console.log(wallet.connectItems.tonProof.proof, wallet.account);
        }
      }),
    []
  );

  // get user data
  useEffect(() => {
    const user = WebApp.initDataUnsafe?.user?.id || '';
    const encrydata = encrypt(
      JSON.stringify({
        address: userFriendlyAddress,
        chain: "-239", // -239 mainnet, -1 testnet
        payload: "",
        user: user,
      })
    );
    console.log(encrydata)
    
  }, [WebApp]);

  return (
    <div className="connect-button">
      <TonConnectButton className="ton-button" />
    </div>
  );
};

export default ConnectButton;

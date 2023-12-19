import React, { useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import { Address } from "@ton/core";
import "./ConnectButton.scss";

import {
  TonConnectButton,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import useAxios from "@/hooks/useAxios";
import { WalletContractV4 } from "@ton/ton";

// hook
const ConnectButton = () => {
  const { post, get } = useAxios();
  const reactWallet = useTonWallet();
  
  /*  login */
  const login = (address) => {
    // get user data
    const user = WebApp.initDataUnsafe?.user?.id || "";
    const userData = {
      address: address,
      chain: "-1", // -239 mainnet, -1 or -3 testnet
      payload: "",
      user: user,
    };
    post("ht/delHost", userData, true, true).then((item) => {
      console.log(item)
    });
  };

  /* first time login */
  const [tonConnectUI] = useTonConnectUI();
  useEffect(
    () =>
      {
        tonConnectUI.onStatusChange((wallet) => {
          console.log("tonconnectUI onStarusChange")
        if (wallet) {
          const address = Address.parse(wallet.account.address);
          console.log("connectbutton:", wallet)
          localStorage.setItem("walletAddress", address.toRawString())
          login(address.toRawString());
        }
        // if (
        //   wallet.connectItems?.tonProof &&
        //   "proof" in wallet.connectItems.tonProof
        // ) {
        //   console.log(wallet.connectItems.tonProof.proof, wallet.account);
        // }
      })
        console.log(reactWallet)
    },
    []
  );

  /* check wallet status first */


  return (
    <div className="connect-button">
      <TonConnectButton className="ton-button" />
    </div>
  );
};

export default ConnectButton;

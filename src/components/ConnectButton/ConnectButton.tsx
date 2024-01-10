import React, { useCallback, useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { Address } from "@ton/core";
import "./ConnectButton.scss";

import {
  TonConnectButton,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import useAxios from "@/hooks/useAxios";
import useEncrypt from "@/hooks/useEncrypt";
import Cookies from "js-cookie";

// hook
const ConnectButton = () => {
  const reactWallet = useTonWallet();
  const { post } = useAxios();
  const { encrypt } = useEncrypt();

  /*  login */
  const login = (address) => {
    console.log("dataunsafe:", WebApp.initDataUnsafe);
    // get payload first
    post("/user/generatePayload", {
      address: address,
      signature: encrypt(address),
    }).then((res) => {
      const userid = WebApp.initDataUnsafe?.user?.id || "123123";
      const username = WebApp.initDataUnsafe?.user?.id || "testusername";
      const network = "-1"; // -239 mainnet, -1 or -3 testnet
      const encryptString = `${userid}|${address}|${network}|${username}`; // order cannot change id-address-network-name
      const signature = encrypt(encryptString);
      const loginParams = {
        userId: userid,
        username: username,
        address: address,
        network: network,
        signature: signature,
        payload: res,
      };
      // then login with payload
      post("/user/login", loginParams).then((token: string) => {
        if (token) {
          sessionStorage.setItem("token", token);
        }
      }).catch(err => {
        console.log(err)
      });
    }).catch(err => {
      console.log(err)
    });
    // get user data
  };




  /* first time login */
  const [tonConnectUI] = useTonConnectUI();
  useEffect(() => {
    tonConnectUI.onStatusChange((wallet) => {
      console.log("tonconnectUI onStatusChange");
      if (wallet) {
        const bufferAddress = Address.parse(wallet.account.address);
        const addressString = bufferAddress.toRawString()
        Cookies.set("address", addressString)
        login(addressString);
      }
    });
    console.log(reactWallet);
  }, []);

  /* check wallet status first */

  return (
    <div className="connect-button">
      <TonConnectButton className="ton-button" />
    </div>
  );
};

export default ConnectButton;

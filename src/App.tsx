import { useState } from "react";
import reactLogo from "./assets/react.svg";
import eruda from "eruda";

import "./App.css";

import WebApp from "@twa-dev/sdk";
import useTonConnect from "@/hooks/useTonConnect";
import useEncrypt from "@/hooks/useEncrypt";

function App() {
  const { connector, getWallets, connect } = useTonConnect();
  const { encrypt } = useEncrypt();
  const [count, setCount] = useState(0);
  console.log(WebApp.initData);
  const wallets = getWallets();
  const connectWallet = () => {
    const walletConnectionSource = {
      jsBridgeKey: "tonkeeper",
    };

    connector.connect(walletConnectionSource);
    const unsubscribe = connector.onStatusChange((walletInfo) => {
      console.log(walletInfo);
      // update state/reactive variables to show updates in the ui
    });
  };

  const encrydata = encrypt(
    JSON.stringify({
      address:
        "0:b458c58bb40e7ddd627717695cea84a9cbede9513f4b1d9fe503fe4b310963d9",
      chain: "-239",
      payload: "123",
    })
  );
  console.log(encrydata);
  // 0QBTBIv702p5mocP2a7fb_ubIMTRxOcPDNojulE2LILctxkm
  console.log(wallets);

  eruda.init();

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={connectWallet}>connect</button>
        <div className="card">
          <button
            onClick={() =>
              WebApp.showAlert(`Hello World! Current count is ${count}`)
            }
          >
            Show Alert
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

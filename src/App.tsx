import { useState } from "react";
import reactLogo from "./assets/react.svg";

import "./App.css";

import WebApp from "@twa-dev/sdk";
import useTonConnect from "@/hooks/useTonConnect";

function App() {
  const { connector, getWallets, connect } = useTonConnect();
  const [count, setCount] = useState(0);

  const wallets = getWallets();
  const connectWallet = () => {
    const walletConnectionSource = {
      jsBridgeKey: "tonkeeper",
    };

    connector.connect(walletConnectionSource);
    const unsubscribe = connector.onStatusChange((walletInfo) => {
      console.log(walletInfo)
      // update state/reactive variables to show updates in the ui
    });
  };
  console.log(wallets);
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

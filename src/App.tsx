// modules
import { useState } from "react";
import eruda from "eruda";
import WebApp from "@twa-dev/sdk";
import { Routes, Route, HashRouter } from "react-router-dom";

// style
import "./App.css";
import "@/styles/Shared.css";

// components
import TopBar from "./pages/TopBar/TopBar";
import HomePage from "./pages/HomePage/HomePage";
import WalletPage from "./pages/WalletPage/WalletPage";
import MarketPage from "./pages/MarketPage/MarketPage";
import OrderPage from "./pages/OrderPage/OrderPage";

// hooks
import useEncrypt from "@/hooks/useEncrypt";

function App() {
  const { encrypt } = useEncrypt();
  const [count, setCount] = useState(0);

  const alertClick = () => {
    WebApp.showAlert(`Hello World! Current count is ${count}`);
    console.log(WebApp.initDataUnsafe);
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

  eruda.init();

  return (
    <div className="App flex-column">
      <HashRouter>
        <TopBar />
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/market"} element={<MarketPage />} />
          <Route path={"/wallet"} element={<WalletPage />} />
          <Route path={"/order"} element={<OrderPage />} />
          {/* <Route path={"/auth"} element={<AuthPage />} /> */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

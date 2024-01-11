// modules
import { useCallback, useEffect, useState } from "react";
import eruda from "eruda";
import WebApp from "@twa-dev/sdk";
import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import GlobalContext from "@/store/global-context";
import { Toaster } from 'react-hot-toast';
// style
import "./App.css";
import "@/styles/Shared.css";
// import "react-toastify/dist/ReactToastify.css";

// components
import TopBar from "./pages/TopBar/TopBar";
import HomePage from "./pages/HomePage/HomePage";
import WalletPage from "./pages/WalletPage/WalletPage";
import MarketPage from "./pages/MarketPage/MarketPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
// hooks
import useEncrypt from "@/hooks/useEncrypt";
//hoc
import WithWebsocket from "@/hoc/withWebsocket.tsx";

function App(props) {
  console.log("app start")
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = props;
  // ys test : 0QDAzIZ6M3IN8ka6teYN-djiGXjAjprkZqjb_gdKM3yunQPs
  // fyk test: 0QBTBIv702p5mocP2a7fb_ubIMTRxOcPDNojulE2LILctxkm
  const [userId, setUserId] = useState("");


  const setUserIdHandler = useCallback((id) => {
    setUserId(id);
  }, [])


  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
    console.log(WebApp.isExpanded);
  }, []);
  console.log("webapp initdataunsafe",WebApp.initDataUnsafe, WebApp.initDataUnsafe?.user?.id)

  eruda.init();

  return (
    <div className="App flex-column">
      <GlobalContext.Provider
        value={{
          userId,
          setUserIdHandler,
          sendMessage,
          sendJsonMessage,
          lastMessage,
          lastJsonMessage,
          readyState,
          getWebSocket,
        }}
      >
        <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/waka992/waka992.github.io/master/tonconnect-manifest.json">

          <HashRouter>
            <TopBar />
            <Routes>
              <Route path={"/"} element={<HomePage />} />
              <Route path={"/market"} element={<MarketPage />} />
              <Route path={"/wallet"} element={<WalletPage />} />
              <Route path={"/trade"} element={<OrderPage />} />
              <Route path={"/history"} element={<HistoryPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </HashRouter>
        </TonConnectUIProvider>
      </GlobalContext.Provider>
      <Toaster
         position="top-center"
         reverseOrder={false}
      />
    </div>
  );
}

const WSapp = WithWebsocket(App);

export default WSapp;

// modules
import { useEffect, useState } from "react";
import eruda from "eruda";
import WebApp from "@twa-dev/sdk";
import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import GlobalContext from "@/store/global-context";
import { ToastContainer } from "react-toastify";
// style
import "./App.css";
import "@/styles/Shared.css";
import "react-toastify/dist/ReactToastify.css";

// components
import TopBar from "./pages/TopBar/TopBar";
import HomePage from "./pages/HomePage/HomePage";
import WalletPage from "./pages/WalletPage/WalletPage";
import MarketPage from "./pages/MarketPage/MarketPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
// hooks
import useEncrypt from "@/hooks/useEncrypt";
//hoc
import WithWebsocket from "@/hoc/withWebsocket.tsx";

function App(props) {
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = props;
  const { encrypt } = useEncrypt();
  const [count, setCount] = useState(0);
  // fyk test: 0QBTBIv702p5mocP2a7fb_ubIMTRxOcPDNojulE2LILctxkm
  const [userId, setUserId] = useState("")

  const setUserIdHandler = (id) => {
    setUserId(id)
  }
  const alertClick = () => {
    WebApp.showAlert(`Hello World! Current count is ${count}`);
    console.log(WebApp.initDataUnsafe);
  };

  useEffect(() => {
    WebApp.ready()
    WebApp.expand()
    console.log(WebApp.isExpanded)
  }, [])

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
        <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/waka992/waka992.github.io/master/docs/tonconnect-manifest.json">
          <HashRouter>
            <TopBar />
            <Routes>
              <Route path={"/"} element={<HomePage />} />
              <Route path={"/market"} element={<MarketPage />} />
              <Route path={"/wallet"} element={<WalletPage />} />
              <Route path={"/order"} element={<OrderPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
              {/* <Route path={"/auth"} element={<AuthPage />} /> */}
            </Routes>
          </HashRouter>
        </TonConnectUIProvider>
      </GlobalContext.Provider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

const WSapp = WithWebsocket(App);

export default WSapp;

import React from "react";

const GlobalContext = React.createContext({
  userId: "",
  // websocket functions below
  setUserIdHandler: (number) => {},
  sendMessage: () => {},
  sendJsonMessage: () => {},
  lastMessage: () => {},
  lastJsonMessage: () => {},
  readyState: () => {},
  getWebSocket: () => {},
});

export default GlobalContext;

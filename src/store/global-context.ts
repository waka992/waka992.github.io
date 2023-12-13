import React from "react";

const GlobalContext = React.createContext({
    sendMessage: () => {},
    sendJsonMessage: () => {},
    lastMessage: () => {},
    lastJsonMessage: () => {},
    readyState: () => {},
    getWebSocket: () => {},
});

export default GlobalContext;
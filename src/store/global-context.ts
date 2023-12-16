import React from "react";

const GlobalContext = React.createContext({
    userId: "",
    setUserIdHandler: () =>{},
    sendMessage: () => {},
    sendJsonMessage: () => {},
    lastMessage: () => {},
    lastJsonMessage: () => {},
    readyState: () => {},
    getWebSocket: () => {},
});

export default GlobalContext;
import useWebSocket from "react-use-websocket";

const WithWebsocket = (WrappedComponent) => {
  const WrappedComponentWithModel = (props) => {
    const socketUrl = "wss://echo.websocket.org";

    const {
      sendMessage,
      sendJsonMessage,
      lastMessage,
      lastJsonMessage,
      readyState,
      getWebSocket,
    } = useWebSocket(socketUrl, {
      onOpen: () => console.log("opened"),
      //Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: (closeEvent) => false,
    });

    return (
      <WrappedComponent
        {...props}
        sendMessage={sendMessage}
        sendJsonMessage={sendJsonMessage}
        lastMessage={lastMessage}
        lastJsonMessage={lastJsonMessage}
        readyState={readyState}
        getWebSocket={getWebSocket}
      />
    );
  };

  return WrappedComponentWithModel;
};

export default WithWebsocket;

import useWebSocket, { ReadyState } from "react-use-websocket";
import WebApp from "@twa-dev/sdk";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const WithWebsocket = (WrappedComponent) => {
  const WrappedComponentWithModel = (props) => {
    const userid = WebApp.initDataUnsafe?.user?.id || 123123;
    const socketUrl = `ws://127.0.0.1:443/ws/${userid}`;

    const {
      sendMessage,
      sendJsonMessage,
      lastMessage,
      lastJsonMessage,
      readyState,
      getWebSocket,
    } = useWebSocket(socketUrl, {
      onOpen: () => console.log("websocket opened"),
      //Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: (closeEvent) => false,
    });
    const connectionStatus = {
      [ReadyState.CONNECTING]: "Connecting",
      [ReadyState.OPEN]: "Open",
      [ReadyState.CLOSING]: "Closing",
      [ReadyState.CLOSED]: "Closed",
      [ReadyState.UNINSTANTIATED]: "Uninstantiated",
    }[readyState];
    console.log(connectionStatus);

    if (connectionStatus == "Connecting") {
      // skeleton
      return (
        <div style={{
          marginTop: "86px",
          paddingLeft:"20px"
        }}>
       
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton
              variant="rectangular"
              width={"90vw"}
              height={"20vh"}
              sx={{
                borderRadius: "10px"
              }}
              animation="wave"
            />

            <Skeleton variant="text" width={"90vw"} height={"28px"} sx={{ marginTop:"100px",borderRadius: "10px" }} />

            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton
              variant="rectangular"
              width={210}
              height={"62px"}
              sx={{ marginTop:"14px", borderRadius: "10px" }}
              animation="wave"
            />
            <Skeleton
              variant="rectangular"
              width={210}
              height={"62px"}
              sx={{ marginTop:"14px", borderRadius: "10px" }}
              animation="wave"
            />
            <Skeleton
              variant="rectangular"
              width={210}
              height={"62px"}
              sx={{ marginTop:"14px", borderRadius: "10px" }}
              animation="wave"
            />
        </div>
      );
    }

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

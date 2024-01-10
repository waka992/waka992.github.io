import useWebSocket, { ReadyState } from "react-use-websocket";
import WebApp from "@twa-dev/sdk";
import Skeleton from "@mui/material/Skeleton";
import useEncrypt from "@/hooks/useEncrypt";
import { useCallback, useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";

const WithWebsocket = (WrappedComponent) => {
  const { encrypt } = useEncrypt();
  const { post } = useAxios();

  const WrappedComponentWithModel = (props) => {
    const [socketUrl, setSocketUrl] = useState("");
    const getSocketUrl = useCallback(() => {
      return new Promise((resolve) => {
        if (socketUrl) {
          setTimeout(() => {
            resolve(`ws://127.0.0.1:8088/ws/${socketUrl}`);
          }, 0);
        }
      });
    }, [socketUrl]);

    const {
      sendMessage,
      sendJsonMessage,
      lastMessage,
      lastJsonMessage,
      readyState,
      getWebSocket,
    } = useWebSocket(getSocketUrl as any, {
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

    const getListenKey = () => {
      const userid = WebApp.initDataUnsafe?.user?.id || 123123;
      const encryptUserid = encrypt(userid);
      const params = {
        userId: userid,
        signature: encryptUserid,
      };
      post("/listenkey", params).then((res: string) => {
        console.log("res", res);
        setSocketUrl(res);
      }).catch(err => {
        console.log(err)
      });
    };

    useEffect(() => {
      getListenKey();
    }, []);
    // if (connectionStatus == "Connecting") {
    //   // skeleton
    //   return (
    //     <div
    //       style={{
    //         marginTop: "86px",
    //         paddingLeft: "20px",
    //       }}
    //     >
    //       <Skeleton
    //         variant="rectangular"
    //         width={"90vw"}
    //         height={"20vh"}
    //         sx={{
    //           borderRadius: "10px",
    //         }}
    //         animation="wave"
    //       />

    //       <Skeleton
    //         variant="text"
    //         width={"90vw"}
    //         height={"28px"}
    //         sx={{ marginTop: "100px", borderRadius: "10px" }}
    //       />

    //       <Skeleton
    //         variant="rectangular"
    //         width={210}
    //         height={"62px"}
    //         sx={{ marginTop: "14px", borderRadius: "10px" }}
    //         animation="wave"
    //       />
    //       <Skeleton
    //         variant="rectangular"
    //         width={210}
    //         height={"62px"}
    //         sx={{ marginTop: "14px", borderRadius: "10px" }}
    //         animation="wave"
    //       />
    //       <Skeleton
    //         variant="rectangular"
    //         width={210}
    //         height={"62px"}
    //         sx={{ marginTop: "14px", borderRadius: "10px" }}
    //         animation="wave"
    //       />
    //     </div>
    //   );
    // }

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

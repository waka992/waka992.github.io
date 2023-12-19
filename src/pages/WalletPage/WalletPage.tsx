import React, { useEffect, useState } from "react";
import "./WalletPage.scss";
import "@/styles/Tabs.css";
import Wallet from "@/components/Wallet/Wallet";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PositionList from "@/components/PositionList/PositionList";
import CustomTabPanel from "@/components/CustomTabPanel/CustomTabPanel";
import { TonClient, WalletContractV4, internal } from "@ton/ton";
import { mnemonicNew, mnemonicToPrivateKey } from "@ton/crypto";
import { useTonAddress } from "@tonconnect/ui-react";

const WalletPage = () => {
  const [index, setIndex] = useState(0);
  const [address, setAddress] = useState("");
  const walletAddress = useTonAddress();

  useEffect(() => {
    if (walletAddress) {
      setAddress(walletAddress);
    }
  }, [walletAddress]);

  return (
    <div className="wallet-page flex-column flex1">
      <Wallet address={address} />
      <Tabs
        className="tabs"
        value={index}
        onChange={(event, value) => setIndex(value as number)}
      >
        <Tab
          sx={{
            color: "#333",
          }}
          label="Positions"
        />
      </Tabs>
      <Box
        className="quote-content tabs-info flex1 flex-column"
        sx={{ padding: 0 }}
      >
        <CustomTabPanel value={index} index={0}>
          <Box>
            <PositionList control={true} />
          </Box>
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default WalletPage;

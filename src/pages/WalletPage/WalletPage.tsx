import React from "react";
import "./WalletPage.scss";
import "@/styles/Tabs.css";
import Wallet from "@/components/Wallet/Wallet";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PositionList from "@/components/PositionList/PositionList";
import CustomTabPanel from "@/components/CustomTabPanel/CustomTabPanel";


const WalletPage = () => {
  const [index, setIndex] = React.useState(0);

  return (
    <div className="wallet-page  flex-column flex1">
      <Wallet />
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
        <Tab
          sx={{
            color: "#333",
          }}
          label="Orders"
        />
      </Tabs>
      <Box className="quote-content tabs-info flex1 flex-column" sx={{padding: 0}}>
        <CustomTabPanel value={index} index={0}>
          <Box>
            <PositionList />
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={index} index={1}>
          <Box>
            <PositionList />
          </Box>
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default WalletPage;

import React, { useState } from "react";
import "./TokenSwitch.scss";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import Drawer from "@mui/material/Drawer";
import "@/styles/Tabs.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CustomTabPanel from "../CustomTabPanel/CustomTabPanel";
import useFormatUSD from "@/hooks/useFormatUSD";

type Props = {
  tokenSymbol: string;
  changeTokenSymbol: (string) => void;
};

const TokenSwitch = (props: Props) => {
  const formatusd = useFormatUSD()

  const [open, setOpen] = useState(false);
  const [index, setIndex] = React.useState(0);
  const [tokenList, setTokenList] = React.useState([
    {
      name: "BTCUSDT",
      price: formatusd(43891.0),
      change: -0.63,
    },
    {
      name: "ETHUSDT",
      price: formatusd(2349.0),
      change: -1.12,
    },
  ]);

  const selectToken = (name) => {
    props.changeTokenSymbol(name);
    setOpen(!open);
  };
  return (
    <div className="token-switch">
      <div className="token-area clickable" onClick={() => setOpen(true)}>
        <CgArrowsExchangeAlt className="exchange-icon" />
        <div className="token-name">{props.tokenSymbol}</div>
      </div>
      <Drawer
        className="token-switch-drawer"
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div
          className="contract-list"
          style={{ width: "80vw", padding: "10px" }}
        >
          <div className="contract-header">CONTRACT</div>
          <Tabs
            className="tabs"
            value={index}
            onChange={(event, value) => setIndex(value as number)}
          >
            <Tab
              sx={{
                color: "#333",
                padding: 0,
                height: "10px",
              }}
              label="All"
            />
          </Tabs>
          <Box className="tabs-info flex1 flex-column" sx={{ padding: 0 }}>
            <CustomTabPanel value={index} index={0}>
              <Box>
                <div className="token-list">
                  <div className="token-list-title flex-row">
                    <span className="token-name">Name</span>
                    <span className="token-change">
                      Latest Price/24h Change
                    </span>
                  </div>
                  <div className="token-list-info">
                    {tokenList.map((item, index) => {
                      return (
                        <div
                          className="token-list-item flex-row clickable"
                          key={index}
                          onClick={() => selectToken(item.name)}
                        >
                          <span className="token-item-name-info">
                            <div className="token-item-name">{item.name}</div>
                          </span>

                          <span className="token-item-price-info">
                            <div className="token-item-price --ischange up">
                              {item.price}
                            </div>
                            <div className="token-item-change --ischange down">
                              {item.change}%
                            </div>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Box>
            </CustomTabPanel>
          </Box>
        </div>
      </Drawer>
    </div>
  );
};

export default TokenSwitch;

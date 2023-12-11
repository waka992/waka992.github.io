import React from "react";
import "./OrderPage.scss";
import "@/styles/Tabs.css";
import TokenSwitch from "@/components/TokenSwitch/TokenSwitch";
import { FaCaretDown } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { MdCandlestickChart } from "react-icons/md";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PositionList from "@/components/PositionList/PositionList";
import CustomTabPanel from "@/components/CustomTabPanel/CustomTabPanel";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
type Props = {};

const OrderPage = (props: Props) => {
  const [index, setIndex] = React.useState(0);

  return (
    <div className="order-page">
      <div className="order-token-control flex-row bottom-gap">
        <div className="order-token-control-left">
          <TokenSwitch />
        </div>

        <MdCandlestickChart  className="order-token-control-right"/>
      </div>

      <div className="order-info flex-row bottom-gap">
        <div className="lever clickable order-base-color">
          <span>Lever: </span>
          <span>5x</span>
          <span>
            <FaCaretDown className="lever-icon" />
          </span>
        </div>

        <div className="order-fee">
          <div className="order-fee-title">Fee/Countdown</div>
          <div className="order-fee-value order-base-color">
            0.0184%/06:24:06
          </div>
        </div>
      </div>

      <div className="direction flex-row bottom-gap">
        <span className="direction-button flex1 clickable direction-left selected">
          Open Position
        </span>
        <span className="direction-button flex1 clickable direction-right">
          Close Position
        </span>
      </div>

      <div className="order-amount bottom-gap">
        <div className="avaiable-amount flex-row">
          <span className="avaiable-amount-title">Available</span>
          <span className="avaiable-amount-value order-base-color">
            0.00 USDT
          </span>
        </div>

        <div className="value-box">
          <div className="value-input">
            <TextField
              id="filled-start-adornment"
              type="number"
              sx={{ width: "100%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">USDT</InputAdornment>
                ),
              }}
              variant="filled"
            />
          </div>
          <div className="value-shortcut flex-row">
            <span className="flex1">+10</span>
            <span className="flex1">+100</span>
            <span className="flex1">+500</span>
            <span className="flex1">MAX</span>
          </div>
        </div>

        <div className="balance bottom-gap">
          <span>Balance: </span>
          <span>20 </span>
          <span className="balance-trans">Transfer</span>
        </div>

        <div className="slippage bottom-gap flex-row">
          <span className="slippage-title-intro">Slippage Tolerance</span>
          <span>
            <span className="slippage-value order-base-color">0.1%</span>
              <FiEdit className="slippage-icon" />
          </span>
        </div>

        <div className="control-buttons">
          <div className="open-control  flex-row">
            <div className="open-long-button control-button flex-column button-green">
              <span className="button-text">Open/Long</span>
              <span className="calculate-value">≈0.003 BTC</span>
            </div>
            <div className="open-short-button control-button flex-column button-red">
              <span className="button-text">Open/Short</span>
              <span className="calculate-value">≈0.003 BTC</span>
            </div>
          </div>
        </div>

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
        <Box className="tabs-info flex1 flex-column" sx={{ padding: 0 }}>
          <CustomTabPanel value={index} index={0}>
            <Box>
              <PositionList />
            </Box>
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
};

export default OrderPage;

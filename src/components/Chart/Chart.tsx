import React, { useState } from "react";
import "./Chart.scss";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import ChartHeader from "./ChartHeader/ChartHeader";
import TokenSwitch from "../TokenSwitch/TokenSwitch";
import TradingViewWidget from "./TradingView/TradingView";

const Chart = () => {
  const [priceCollection, setPriceCollection] = useState({});
  const [tokenSymbol, setTokenSymbol] = useState("BTCUSDT")
  const changeTokenSymbol = (value) => {
    setTokenSymbol(value)
  }
  return (
    <div className="chart">
      <TokenSwitch tokenSymbol={tokenSymbol} changeTokenSymbol={changeTokenSymbol}/>
      <ChartHeader />
      <div className="chart-container">
        <TradingViewWidget tokenSymbol={tokenSymbol}/>
      </div>
      <div className="operate-buttons flex-row">
        <div className="operate-button button-green">Open</div>
        <div className="operate-button button-red">Close</div>
      </div>
    </div>
  );
};

export default Chart;

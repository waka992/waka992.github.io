import React, { useCallback, useState } from "react";
import "./Chart.scss";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import ChartHeader from "./ChartHeader/ChartHeader";
import TokenSwitch from "../TokenSwitch/TokenSwitch";
import TradingViewWidget from "./TradingView/TradingView";
import { useNavigate } from "react-router-dom";

const Chart = () => {
  const [tokenSymbol, setTokenSymbol] = useState("BTCUSDT")
  const nav = useNavigate()

  const changeTokenSymbol = (value) => {
    setTokenSymbol(value)
  }

  const navToOrder = useCallback((direction) => {
    nav("/trade", {state: {direction: direction}})
  }, [])

  return (
    <div className="chart">
      <TokenSwitch tokenSymbol={tokenSymbol} changeTokenSymbol={changeTokenSymbol}/>
      <ChartHeader />
      <div className="chart-container">
        <TradingViewWidget tokenSymbol={tokenSymbol}/>
      </div>
      <div className="operate-buttons flex-row">
        <div className="operate-button button-green" onClick={() => navToOrder("long")}>Long</div>
        <div className="operate-button button-red" onClick={() => navToOrder("short")}>Short</div>
      </div>
    </div>
  );
};

export default Chart;

import React, { useState } from "react";
import "./HistoryPage.scss";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const HistoryPage = () => {
  const nav = useNavigate();
  const onBack = () => {
    nav(-1);
  };

  const [historyList, setHistoryList] = useState([
    {
      symbol: "BTCUSDT",
      time: "2023-12-21 09:53:15",
      status: "Filled",
      side: "BUY",
      filled: 0.05,
      amount: 0.05,
      orderQuantity: 0,
      orderPrice: 42921.96,
      finalPrice: 42921.96,
    },
    {
      symbol: "BTCUSDT",
      time: "2023-12-21 09:53:15",
      status: "Canceled",
      side: "BUY",
      filled: 0,
      amount: 0.1,
      orderPrice: 42921.96,
      finalPrice: 42921.96,
    },
    {
      symbol: "BTCUSDT",
      time: "2023-12-21 09:53:15",
      status: "Filled/Liquidation",
      side: "SELL",
      filled: 0.2,
      amount: 0.2,
      averagePrice: 43610.6,
      orderPrice: 42921.96,
      finalPrice: 42921.96,
      markPrice: 43090.82,
    },
  ]);
  return (
    <div className="history-page">
      <div className="history-header">
        <FaArrowLeft className="back-button clickable" onClick={onBack} />
        <span className="history-title">Contract History</span>
      </div>

      <div className="history-list">
        {historyList.map((item, index) => (
          <div className="history-item" key={index}>
            <div className="symbol-info flex-row">
              <div className="symbol-box">{item.symbol}</div>
              <div className="time-box">{item.time}</div>
            </div>
            <div className="trade-info flex-row">
              <div
                className={`side-box ${
                  item.side.toUpperCase().indexOf("BUY") !== -1 ? "up" : "down"
                }`}
              >
                {item.side.toUpperCase()}
              </div>
              <div
                className={`status-box ${
                  item.status.toUpperCase().indexOf("FILLED") !== -1 ? "up" : "cancel"
                }`}
              >
                {item.status}
              </div>
            </div>
            <div className="quantity-info flex-row">
              <div className="quantity-desc">
                AMOUNT({item.symbol.slice(0, -4)})
              </div>
              <div className="quantity-box">
                <span>{item.status === "CANCELED" ? "--" : item.filled}</span> /{" "}
                {item.amount}
              </div>
            </div>
            <div className="price-info flex-row">
              <div className="price-final">{item.finalPrice}</div>
              <div className="price-order">{item.orderPrice}</div>
            </div>
            {item.status.indexOf("FORCED") !== -1 && (
              <div className="mark-price-info flex-row"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;

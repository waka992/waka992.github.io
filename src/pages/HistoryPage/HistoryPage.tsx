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
      status: "all",
      direction: "BUY",
      orderQuantity: 0,
      orderPrice: 42921.96,
    },
    {
      symbol: "BTCUSDT",
      time: "2023-12-21 09:53:15",
      status: "cancelled",
      direction: "BUY",
      orderQuantity: 0,
      orderPrice: 42921.96,
    },
    {
      symbol: "BTCUSDT",
      time: "2023-12-21 09:53:15",
      status: "all",
      direction: "SELL",
      orderQuantity: 0,
      dealQuantity: 0.005,
      averagePrice: 43610.6,
      orderPrice: 42921.96,
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
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;

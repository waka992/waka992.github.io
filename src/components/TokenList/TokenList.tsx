import React, { useState } from "react";
import "./TokenList.scss";
import SortArrow from "../SortArrow/SortArrow";

const TokenList = () => {
  const [filter, setFilter] = useState({
    target: "volume",
    direction: "volume",
  });

  const [tradeList] = useState([
    { pair: "USDT/BTC", volume: "37146.83 TON", price: 19.293, change: -90.43 },
    { pair: "USDT/BTC", volume: "37146.83 TON", price: 19.293, change: 12.43 },
    { pair: "USDT/BTC", volume: "37146.83 TON", price: 19.293, change: 12.43 },
    { pair: "USDT/BTC", volume: "37146.83 TON", price: 19.293, change: 12.43 },
    { pair: "USDT/BTC", volume: "37146.83 TON", price: 19.293, change: 12.43 },
    { pair: "USDT/BTC", volume: "37146.83 TON", price: 19.293, change: 12.43 },
    { pair: "USDT/BTC", volume: "37146.83 TON", price: 19.293, change: 12.43 },
    { pair: "USDT/BTC", volume: "37146.83 TON", price: 19.293, change: 12.43 },
    { pair: "USDT/BTC", volume: "37146.83 TON", price: 19.293, change: 12.43 },
    { pair: "USDT/BTC", volume: "37146.83 TON", price: 19.293, change: 12.43 },
    { pair: "USDT/BTC", volume: "37146.83 TON", price: 19.293, change: 12.43 },
    { pair: "USDT/BTC", volume: "37146.83 TON", price: 19.293, change: 12.43 },
    { pair: "USDT/BTC", volume: "37146.83 TON", price: 19.293, change: 12.43 },
    { pair: "USDT/BTC", volume: "37146.83 TON", price: 19.293, change: 12.43 },
  ]);

  const filterClick = (target) => {
    let direction = "";
    if (target === filter.target) {
      direction = filter.direction === "volume" ? "asc" : "volume";
    } else {
      direction = "volume";
    }
    setFilter({ target, direction });
  };

  return (
    <div className="token-list flex-column">
      <div className="token-header flex-row">
        <div
          className="token-header-item clickable"
          onClick={() => filterClick("volume")}
        >
          <span>Pair / 24h volume</span>
          <span className="token-header-sort">
            <SortArrow
              direct={filter.target === "volume" ? filter.direction : ""}
            />
          </span>
        </div>

        <div className="token-header-item">
          <span>Last price</span>
        </div>

        <div
          className="token-header-item clickable"
          onClick={() => filterClick("change")}
        >
          <span>Change</span>
          <span className="token-header-sort">
            <SortArrow
              direct={filter.target === "change" ? filter.direction : ""}
            />
          </span>
        </div>
      </div>

      <div className="token-box flex1">
        {tradeList.map((item, key) => {
          return (
            <div className="token-item" key={key}>
              <div className="token-info">
                <div className="token-pair">{item.pair}</div>
                <div className="token-volume">{item.volume}</div>
              </div>
              <div className="token-price">{item.price}</div>
              <div className={`${item.change < 0 ? "down" : "up"} token-change`}>
                {item.change}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TokenList;

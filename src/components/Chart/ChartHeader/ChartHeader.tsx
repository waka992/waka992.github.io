import React from "react";
import "./ChartHeader.scss";
import useFormatUSD from "@/hooks/useFormatUSD";
type Props = {};

const ChartHeader = (props: Props) => {
  const formatusd = useFormatUSD()

  return (
    <div className="chart-header flex-row">
      <div className="new-price-area">
        <div className="new-price-title">Latest Price</div>
        <div className="new-price-value --ischange up">{formatusd(43990)}</div>
        <div className="calc-new-price">
          <span className="approximate-price">≈${formatusd(43987.2)}</span>
          <span className="approximate-change --ischange up">+0.8%</span>
        </div>
        <div className="mark-price">
          <span className="mark-price-title">Mark Price</span>
          <span className="mark-price-value">{formatusd(43986.2)}</span>
        </div>
      </div>

      <div className="price-infomation flex-column">
        <div className="top-area flex-row">
          <div className="price-high flex-column price-margin-right">
            <span className="price-info-text">24h High</span>
            <span className="price-info-value">{formatusd(44081.6)}</span>
          </div>
          <div className="price-volume flex-column">
            <span className="price-info-text">24h Vol(BTC)</span>
            <span className="price-info-value">{formatusd(44081.6)}</span>
          </div>
        </div>

        <div className="bottom-area flex-row">
          <div className="price-low flex-column price-margin-right">
            <span className="price-info-text">24h Low</span>
            <span className="price-info-value">{formatusd(44081.6)}</span>
          </div>
          <div className="price-volume flex-column">
            <span className="price-info-text">24h Vol(USDT)</span>
            <span className="price-info-value">{formatusd(44081.6)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartHeader;

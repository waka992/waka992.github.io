import React, { useEffect, useState } from "react";
import "./ChartHeader.scss";
import useFormatUSD from "@/hooks/useFormatUSD";
import useAxios from "@/hooks/useAxios";
type Props = {
  tokenSymbol: string
};

const ChartHeader = (props: Props) => {
  const [price, setPrice] = useState(0)
  const formatusd = useFormatUSD()
  const {get} = useAxios()
  const fetchTradeData = () => {
    // try {}
    get("/coinmarket/price", {
      }).then((res) => {
        if (res && res.data) {
          const list = res.data.slice(0,20)
          for (let i = 0; i < list.length; i++) {
            const element = list[i];
            if (element.symbol=== props.tokenSymbol.slice(0,-4)) {
              const data = element.quote.usd
              const {price} = data
              setPrice(price)
            }
            
          }
          // setTradeList(list)
        }
      }).catch(err=> {
        console.log("coinmarketerror", err)
      });
  };
  useEffect(() => {
    fetchTradeData()
    const timer = setInterval(() => {
      fetchTradeData()
    }, 600000);

    return () => clearInterval(timer);
  }, [props.tokenSymbol])

  return (
    <div className="chart-header flex-row">
      <div className="new-price-area">
        <div className="new-price-title">Latest Price</div>
        <div className="new-price-value --ischange up">{formatusd(price)}</div>
        {/* <div className="calc-new-price">
          <span className="approximate-price">≈${formatusd(43987.2)}</span>
          <span className="approximate-change --ischange up">+0.8%</span>
        </div>
        <div className="mark-price">
          <span className="mark-price-title">Mark Price</span>
          <span className="mark-price-value">{formatusd(43986.2)}</span>
        </div> */}
      </div>

      <div className="price-infomation flex-column">
        <div className="top-area flex-row">
          <div className="price-high flex-column price-margin-right">
            <span className="price-info-text">24h High</span>
            <span className="price-info-value">{formatusd(0)}</span>
          </div>
          <div className="price-volume flex-column">
            <span className="price-info-text">24h Vol({props.tokenSymbol.slice(0,-4)})</span>
            <span className="price-info-value">{formatusd(0)}</span>
          </div>
        </div>

        <div className="bottom-area flex-row">
          <div className="price-low flex-column price-margin-right">
            <span className="price-info-text">24h Low</span>
            <span className="price-info-value">{formatusd(0)}</span>
          </div>
          <div className="price-volume flex-column">
            <span className="price-info-text">24h Vol(USDT)</span>
            <span className="price-info-value">{formatusd(0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartHeader;

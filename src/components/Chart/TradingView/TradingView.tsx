import React, { useEffect, useRef, useState } from "react";
import "./TradingView.scss";
let tvScriptLoadingPromise;

type Props = {
  tokenSymbol: string;
};

const TradingViewWidget = (props: Props) => {
  const timeSwap = [
    { name: "Time", params: "1" },
    { name: "15m", params: "15" },
    { name: "1H", params: "60" },
    { name: "4H", params: "240" },
    { name: "1D", params: "D" },
  ];
  const onLoadScriptRef: any = useRef();
  const [timeSelect, setTimeSelect] = useState("D");

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current(timeSelect)
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget(time) {
      if (
        document.getElementById("tradingview_c0d86") &&
        "TradingView" in window
      ) {
        new window.TradingView["widget"]({
          autosize: true,
          symbol: "BINANCE:"+props.tokenSymbol,
          hide_top_toolbar: true,
          hide_legend: true,
          interval: time,
          timezone: "Etc/UTC",
          theme: "light",
          style: "1",
          locale: "en",
          enable_publishing: false,
          container_id: "tradingview_c0d86",
        });
      }
    }
  }, [timeSelect, props.tokenSymbol]);

  return (
    <div className="trading-view" style={{ height: "100%", width: "100%" }}>
      <div className="trading-header flex-row">
        {timeSwap.map((item, index) => {
          return (
            <span
              className={`trading-time-option ${
                item.params === timeSelect ? "hl" : ""
              }`}
              key={index}
              onClick={() => {
                setTimeSelect(item.params);
              }}
            >
              {item.name}
            </span>
          );
        })}
        <span className="trading-time-option">MORE</span>
      </div>
      <div
        className="tradingview-widget-container"
        style={{ height: "100%", width: "100%" }}
      >
        <div
          id="tradingview_c0d86"
          style={{ height: "calc(100% - 32px)", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default TradingViewWidget;

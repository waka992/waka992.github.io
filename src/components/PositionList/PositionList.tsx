import React, { useCallback, useContext, useEffect, useState } from "react";
import "./PositionList.scss";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import AdjustLeverage from "../Drawer/AdjustLeverage/AdjustLeverage";
import ClosePosition from "../Drawer/ClosePosition/ClosePosition";
import useFormatUSD from "@/hooks/useFormatUSD";
import GlobalContext from "@/store/global-context";

interface Props {
  control?: boolean;
}

const PositionList = (props: Props) => {
  const formatusd = useFormatUSD();
  const globalCtx = useContext(GlobalContext)
  const [tradeList, setTradeList] = useState([
    {
      positionId: 0,
      userId: 0,
      symbol: "BTCUSDT",
      direction: "LONG",
      leverage: 50,
      quantity: 0.02,
      margin: 29.7,
      marginRate: 0,
      fee:0,
      entryPrice: 42987.6,
      markPrice: 42987.7,
      forcePrice: 42987.8,
      positionStatus: 0,
      unrealizedProfit: 0,
      roi: 0,
    },
  ]);
  const [selectedItem, setSelectItem] = useState(0)
  const [selectedItemObject, setSelectItemObject] = useState({})

  const [open, setOpen] = useState(false);
  const [leverage, setLeverage] = useState(0)
  const adjustLeverageOpen = useCallback((leverage, index) => {
    setLeverage(leverage)
    setSelectItem(index)
    setOpen(true);
  }, []);

  const adjustLeverageHandle = (leverage) => {
    const list = [...tradeList]
    list[selectedItem] = {...list[selectedItem], leverage}
    setTradeList(list)
  }

  const [positionOpen, setPositionOpen] = useState(false);
  const positionDrawerOpen = useCallback((index) => {
    setSelectItem(index)
    setSelectItemObject(tradeList[index])
    setPositionOpen(true);
  }, []);

  useEffect(() => {
    console.log("websocket lastMessage:", globalCtx.lastMessage)
    if (globalCtx.lastMessage !== null) {
      const positionList = globalCtx.lastMessage.position
      setTradeList(positionList)
    }
  }, [globalCtx.lastMessage])

  return (
    <div className="position-list flex-column">
      {tradeList.map((item, index) => (
        <div className="position-item" key={index}>
          <div className="token-info position-mb">
            <div className={`position-direction ${item.direction.indexOf("LONG") !== -1 ? "up" : "down"}`}></div>
            <div className="token-name">{item.symbol}</div>
            <div className="leverage">{item.leverage}X</div>
          </div>

          <div className="profit flex-row position-mb">
            <div className="profit-loss flex-column">
              <span>PNL</span>
              <span
                className={`pnl-value --ischange ${item.unrealizedProfit >= 0 ? "up" : "down"}`}
              >
                {item.unrealizedProfit}
              </span>
            </div>
            <div className="roi flex-column">
              <span>ROI</span>
              <span
                className={`roi-value --ischange ${item.roi >= 0 ? "up" : "down"}`}
              >
                {item.roi}
              </span>
            </div>
          </div>

          <div className="position-detail flex-column">
            <div className="position-detail-first position-mb flex-row">
              <div className="amount flex-column">
                <span>Quantity(BTC)</span>
                <span className="amount-value value-font-size">{item.quantity}</span>
              </div>

              <div className="margin flex-column">
                <span>Margin (USDT)</span>
                <span className="margin-value value-font-size">
                  {formatusd(item.margin)}
                </span>
              </div>

              <div className="margin-ratio flex-column">
                <span>Margin Ratio</span>
                <span
                  className={`margin-ratio-value --ischange value-font-size ${
                    item.marginRate >= 0 ? "up" : "down"
                  }`}
                >
                  {item.marginRate}
                </span>
              </div>
            </div>
            <div className="position-detail-second position-mb flex-row">
              <div className="entry-price flex-column">
                <span>Entry Price(USDT)</span>
                <span className="entry-price-value value-font-size">
                  {formatusd(item.entryPrice)}
                </span>
              </div>
              <div className="mark-price flex-column">
                <span>Mark Price(USDT)</span>
                <span className="mark-price-value value-font-size">
                  {formatusd(item.markPrice)}
                </span>
              </div>
              <div className="liq-price flex-column">
                <span>Liq.Price(USDT)</span>
                <span className="liq-price-value value-font-size">
                  {formatusd(item.forcePrice)}
                </span>
              </div>
            </div>
          </div>
          {props.control && (
            <div className="operation">
              <div className="adjust-leverage" onClick={() => adjustLeverageOpen(item.leverage, index)}>
                <Button size="small" variant="outlined">
                  Adjust Leverage
                </Button>
              </div>
              <div className="close-position">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => positionDrawerOpen(index)}
                >
                  Close Position
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}

      <Drawer
        className="token-switch-drawer"
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={{ height: "50vh" }}>
          <AdjustLeverage lever={leverage} onClose={() => setOpen(false)} onConfirm={adjustLeverageHandle}/>
        </div>
      </Drawer>

      <Drawer
        anchor="bottom"
        open={positionOpen}
        onClose={() => setPositionOpen(false)}
      >
        <div style={{ height: "70vh" }}>
          <ClosePosition onClose={() => setPositionOpen(false)} item={selectedItemObject}/>
        </div>
      </Drawer>
    </div>
  );
};

export default PositionList;

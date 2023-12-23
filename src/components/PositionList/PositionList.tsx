import React, { useCallback, useState } from "react";
import "./PositionList.scss";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import AdjustLeverage from "../Drawer/AdjustLeverage/AdjustLeverage";
import ClosePosition from "../Drawer/ClosePosition/ClosePosition";
import useFormatUSD from "@/hooks/useFormatUSD";
import { toast } from "react-toastify";

interface Props {
  control?: boolean;
}

const PositionList = (props: Props) => {
  const formatusd = useFormatUSD();
  const [tradeList] = useState([
    { symbol: "USDT/BTC", volume: "37146.83 TON", price: 19.293, change: -90.43 },
  ]);
  const [value] = useState(2);
  const [lever, setLever] = useState(25);

  const [open, setOpen] = useState(false);
  const adjustLeverageHandle = useCallback(() => {
    setOpen(!open);
  }, []);

  const [positionOpen, setPositionOpen] = useState(false);
  const positionDrawerOpen = useCallback(() => {
    setPositionOpen(true);
  }, []);
  const closePositionConfirm = () => {
    setPositionOpen(false)
    toast.success("Order Success")
  };

  return (
    <div className="position-list flex-column">
      <div className="position-item">
        <div className="token-info position-mb">
          <div className="direction up"></div>
          <div className="token-name">BTCUSDT</div>
          <div className="leverage">50X</div>
        </div>

        <div className="profit flex-row position-mb">
          <div className="profit-loss flex-column">
            <span>PNL</span>
            <span
              className={`pnl-value --ischange ${value > 0 ? "up" : "down"}`}
            >
              -2.23
            </span>
          </div>
          <div className="roi flex-column">
            <span>ROI</span>
            <span
              className={`roi-value --ischange ${value > 0 ? "up" : "down"}`}
            >
              -7.05%
            </span>
          </div>
        </div>

        <div className="position-detail flex-column">
          <div className="position-detail-first position-mb flex-row">
            <div className="amount flex-column">
              <span>Quantity(BTC)</span>
              <span className="amount-value value-font-size">0.02</span>
            </div>

            <div className="margin flex-column">
              <span>Margin (USDT)</span>
              <span className="margin-value value-font-size">
                {formatusd(29.7)}
              </span>
            </div>

            <div className="margin-ratio flex-column">
              <span>Margin Ratio</span>
              <span
                className={`margin-ratio-value --ischange value-font-size ${
                  value > 0 ? "up" : "down"
                }`}
              >
                11.34%
              </span>
            </div>
          </div>
          <div className="position-detail-second position-mb flex-row">
            <div className="entry-price flex-column">
              <span>Entry Price(USDT)</span>
              <span className="entry-price-value value-font-size">
                {formatusd(42987.7)}
              </span>
            </div>
            <div className="mark-price flex-column">
              <span>Mark Price(USDT)</span>
              <span className="mark-price-value value-font-size">
                {formatusd(42987.7)}
              </span>
            </div>
            <div className="liq-price flex-column">
              <span>Liq.Price(USDT)</span>
              <span className="liq-price-value value-font-size">
                {formatusd(42987.7)}
              </span>
            </div>
          </div>
        </div>
        {props.control && (
          <div className="operation">
            <div className="adjust-leverage" onClick={adjustLeverageHandle}>
              <Button size="small" variant="outlined">
                Adjust Leverage
              </Button>
            </div>
            <div className="close-position">
              <Button
                size="small"
                variant="outlined"
                onClick={positionDrawerOpen}
              >
                Close Position
              </Button>
            </div>
          </div>
        )}
      </div>

      <Drawer
        className="token-switch-drawer"
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={{ height: "50vh" }}>
          <AdjustLeverage lever={lever} onClose={() => setOpen(false)} />
        </div>
      </Drawer>

      <Drawer
        anchor="bottom"
        open={positionOpen}
        onClose={() => setPositionOpen(false)}
      >
        <div style={{ height: "70vh" }}>
          <ClosePosition
            onConfirm={closePositionConfirm}
            onClose={() => setOpen(false)}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default PositionList;

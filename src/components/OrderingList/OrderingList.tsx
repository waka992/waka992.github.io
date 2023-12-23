import React, { useState } from "react";
import "./OrderingList.scss";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import AdjustLeverage from "../Drawer/AdjustLeverage/AdjustLeverage";

interface Props {
}

const OrderingList = (props: Props) => {
  const [tradeList] = useState([
    { pair: "USDT/BTC", volume: "37146.83 TON", price: 19.293, change: -90.43 },
  ]);
  const [value] = useState(2);
  const [open, setOpen] = useState(false);
  const [lever, setLever] = useState(25);

  const cancelOrder = () => {
    setOpen(!open);
  };

  return (
    <div className="ordering-list flex-column">
      <div className="position-item">
        <div className="token-info position-mb">
          <div className="direction up"></div>
          <div className="token-name">BTCUSDT</div>
          <div className="leverage">50X</div>

          <div className="ordering-operation">
              <Button size="small" variant="outlined" color="error" onClick={cancelOrder}>
                Cancel
              </Button>
          </div>
        </div>
        <div className={`"order-direction position-mb --ischange ${"up"}`}>
          BUY/LONG
        </div>

        <div className="position-detail flex-column">
          <div className="position-detail-first position-mb flex-row">
            <div className="amount flex-column">
              <span>Quantity(BTC)</span>
              <span className="amount-value value-font-size">0.02</span>
            </div>
          </div>
          <div className="position-detail-second position-mb flex-row">
            <div className="entry-price flex-column">
              <span>Entry Price(USDT)</span>
              <span className="entry-price-value value-font-size">
                42987.70
              </span>
            </div>
          </div>
        </div>

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
    </div>
  );
};

export default OrderingList;

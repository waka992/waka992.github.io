import React, { useEffect, useState } from "react";
import "./OrderingList.scss";
import Button from "@mui/material/Button";
import WebApp from "@twa-dev/sdk";
import useAxios from "@/hooks/useAxios";
import useEncrypt from "@/hooks/useEncrypt";
import useFormatUSD from "@/hooks/useFormatUSD";
import toast from "react-hot-toast";

interface Props {}

const OrderingList = (props: Props) => {
  const { post } = useAxios();
  const { encrypt } = useEncrypt();
  const formatusd = useFormatUSD();

  const [tradeList, setTradeList] = useState([
    {
      amount: 0,
      filled: 0,
      orderId: 0,
      price: 0,
      side: "Buy",
      symbol: "BTCUSDT",
      type: "limit",
      leverage: 50,
      pnl: -2.23,
      roi: -7.15,
      margin: 29.7,
      marginRatio: 11.34,
      entryPrice: 42987.6,
      markPrice: 42987.7,
      liqPrice: 42987.8,
    },
  ]);

  const cancelOrder = (id, sym) => {
    const userId = WebApp.initDataUnsafe?.user?.id || 123123;
    const orderId = id;
    const symbol = sym;
    const signature = encrypt(`${userId}|${orderId}`);

    const params = {
      userId,
      orderId,
      symbol,
      signature,
    };
    console.log(params);
    post("/exchange/cancelOrder", params).then((res) => {
      console.log(res);
      toast.success("Order canceled!");
      // getBalance();
    });
  };

  const queryAllOrder = () => {
    const userId = WebApp.initDataUnsafe?.user?.id || 123123;
    const signature = encrypt(`${userId}`);

    const params = {
      userId,
      signature,
    };
    console.log(params);
    post("/exchange/queryAllOrder", params).then((res: any) => {
      console.log(res);
      if (res) {
        setTradeList(res);
      }
      else {
        setTradeList([]);
      }
    });
  };

  useEffect(() => {
    queryAllOrder()
  }, []);

  return (
    <div className="ordering-list flex-column">
      {tradeList.map((item, index) => (
        <div className="position-item" key={index}>
          <div className="token-info position-mb">
            <div
              className={`order-direction ${
                item.side.indexOf("Buy") !== -1 ? "up" : "down"
              }`}
            ></div>
            <div className="token-name">{item.symbol}</div>
            <div className="leverage">{item.leverage}X</div>

            <div className="ordering-operation">
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => cancelOrder(item.orderId, item.symbol)}
              >
                Cancel
              </Button>
            </div>
          </div>
          <div
            className={`"order-direction position-mb --ischange ${
              item.side.indexOf("Buy") !== -1 ? "up" : "down"
            }`}
          >
            {item.side.toUpperCase()}
          </div>

          <div className="position-detail flex-column">
            <div className="position-detail-first position-mb flex-row">
              <div className="amount flex-column">
                <span>Quantity(BTC)</span>
                <span className="amount-value value-font-size">
                  <span className="filled-amount">{item.filled}</span> / {item.amount}
                </span>
              </div>
            </div>
            <div className="position-detail-second position-mb flex-row">
              <div className="entry-price flex-column">
                <span>Entry Price(USDT)</span>
                <span className="entry-price-value value-font-size">
                  {formatusd(item.price)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderingList;

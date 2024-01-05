import React, { useState } from "react";
import "./ClosePosition.scss";
import { Button } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import WebApp from "@twa-dev/sdk";
import toast from 'react-hot-toast';
import useAxios from "@/hooks/useAxios";
import useEncrypt from "@/hooks/useEncrypt";
import useFormatUSD from "@/hooks/useFormatUSD";

type Props = {
  // item: {
  //   symbol: string,
  //   leverage: number,
  //   pnl: number,
  //   roi: number,
  //   quantity: number,
  //   margin: number,
  //   marginRatio: number,
  //   entryPrice: number,
  //   markPrice: number,
  //   liqPrice: number,
  //   direction: string
  // };
  item: any;
  onClose: () => void;
};

const ClosePosition = (props: Props) => {
  const {post} = useAxios()
  const {encrypt} = useEncrypt()
  const formatusd = useFormatUSD()

  const symbol = props.item.symbol;
  // price
  const [price, setPrice] = useState(0);
  const priceChange = (e) => {
    let value: any = e.target.value;
    value = value.replace(/^0+(?=\d)(?<!\.\d*?$)/, '');
    if (/^\d*\.?\d*$/.test(value) && (value >= 0 || value === '')) {
      setPrice(value);
    }
  };

  // amount
  const [amount, setAmount] = useState(props.item.quantity);
  const amountChange = (e) => {
    let value: any = e.target.value;
    value = value.replace(/^0+(?=\d)(?<!\.\d*?$)/, '');
    if (/^\d*\.?\d*$/.test(value) && (value >= 0 || value === '')) {
      setAmount(value);
    }
  };

  const confirm = () => {
    props.onClose()
    const positionId = "";
    const userId = WebApp.initDataUnsafe?.user?.id || 123123;
    const symbol = props.item.symbol;
    const orderType = "STOP"; // STOP / STOP_MARKET
    const orderPrice = price;
    const leverage = props.item.leverage;
    const direction = props.item.direction.toUpperCase().indexOf("LONG") !== -1 ? "SHORT" : "LONG"; // close position should be opposite
    const reduceOnly = "false"

    const signature = encrypt(`${userId}`);

    const params = {
      positionId,
      userId,
      symbol,
      signature,
      orderType,
      orderPrice,
      amount,
      leverage,
      direction,
      reduceOnly
    };
    console.log(params)
    post("/exchange/OpenPerpetualOrder", params).then((res) => {
    console.log(res);
      toast.success("Order placed!")
      // getBalance();
    });
  }

  return (
    <div className="close-position">
      <div className="operate-title">
        Close Position
        <div className="close-button" onClick={props.onClose}>
          <IoCloseSharp />
        </div>
      </div>

      <div className="confirm-info">
        <div className="contract flex-row close-position-mb">
          <span className="flex1 grey">Contract</span>
          <span className="flex1 --tar">{symbol}/{props.item.leverage}</span>
        </div>
        <div className="price flex-row close-position-mb">
          <span className="flex1 grey">Entry Price</span>
          <span className="flex1 --tar">{formatusd(props.item.entryPrice)}</span>
        </div>
        <div className="amount flex-row close-position-mb">
          <span className="flex1 grey">Mark Price</span>
          <span className="flex1 --tar">{formatusd(props.item.markPrice)}</span>
        </div>
      </div>

      <div className="close-info close-position-mb2">
        <div className="close-price close-position-mb">
          <div>PRICE</div>
          <TextField
            fullWidth
            className="amount-input"
            size="small"
            value={price}
            type="number"
            onChange={priceChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">USDT</InputAdornment>
              ),
            }}
            variant="filled"
          />
        </div>
        <div className="close-amount">
          <div>AMOUNT</div>
          <TextField
            fullWidth
            className="amount-input"
            type="number"
            size="small"
            value={amount}
            onChange={amountChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {symbol.slice(0, -4)}
                </InputAdornment>
              ),
            }}
            variant="filled"
          />
        </div>
      </div>

      <div className="position-info close-position-mb2">
      <div className="contract flex-row close-position-mb">
          <span className="flex1 grey">Position Amount</span>
          <span className="flex1 --tar">{props.item.quantity} {symbol.slice(0, -4)}</span>
        </div>
        <div className="price flex-row close-position-mb">
          <span className="flex1 grey">Estimated PNL</span>
          <span className={`flex1 --tar --ischange ${props.item.pnl > 0 ? "up" : "down"}`}>{props.item.pnl} USDT</span>
        </div>
      </div>

      <div className="confirm-button">
        <Button
          color="success"
          className="confirm-button"
          variant="contained"
          onClick={confirm}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default ClosePosition;

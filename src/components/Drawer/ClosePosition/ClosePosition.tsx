import React, { useState } from "react";
import "./ClosePosition.scss";
import { Button } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

type Props = {
  onClose: () => void;
  onConfirm: () => void;
};

const ClosePosition = (props: Props) => {
  const tokenSymbol = "BTCUSDT";
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
  const [amount, setAmount] = useState(0);
  const amountChange = (e) => {
    let value: any = e.target.value;
    value = value.replace(/^0+(?=\d)(?<!\.\d*?$)/, '');
    if (/^\d*\.?\d*$/.test(value) && (value >= 0 || value === '')) {
      setAmount(value);
    }
  };

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
          <span className="flex1 --tar">BTC/USDT</span>
        </div>
        <div className="price flex-row close-position-mb">
          <span className="flex1 grey">Price</span>
          <span className="flex1 --tar">10 USDT</span>
        </div>
        <div className="amount flex-row close-position-mb">
          <span className="flex1 grey">Mark Price</span>
          <span className="flex1 --tar">20 USDT</span>
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
                  {tokenSymbol.slice(0, -4)}
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
          <span className="flex1 --tar">{0.100} {tokenSymbol.slice(0, -4)}</span>
        </div>
        <div className="price flex-row close-position-mb">
          <span className="flex1 grey">Estimated PNL</span>
          <span className={`flex1 --tar --ischange ${price > 0 ? "up" : "down"}`}>-11.28 USDT</span>
        </div>
      </div>

      <div className="confirm-button">
        <Button
          color="success"
          className="confirm-button"
          variant="contained"
          onClick={props.onConfirm}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default ClosePosition;

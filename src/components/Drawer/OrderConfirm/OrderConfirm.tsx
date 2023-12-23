import React from "react";
import "./OrderConfirm.scss";
import { Button } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import useFormatUSD from "@/hooks/useFormatUSD";

type Props = {
  operation: string;
  contract: string;
  price: number;
  amount: number;
  margin: number;
  onClose: () => void;
  onConfirm: () => void;
};

const OrderConfirm = (props: Props) => {
  const formatusd = useFormatUSD()
  return (
    <div className="order-confirm">
      <div className="operate-title">
        {props.operation}
        <div className="close-button" onClick={props.onClose}>
          <IoCloseSharp />
        </div>
      </div>

      <div className="confirm-info">
        <div className="contract flex-row order-confirm-mb">
          <span className="flex1 grey">Contract</span>
          <span className="flex1 --tar">{props.contract}</span>
        </div>
        <div className="price flex-row order-confirm-mb">
          <span className="flex1 grey">Price</span>
          <span className="flex1 --tar">{formatusd(props.price)} USDT</span>
        </div>
        <div className="amount flex-row order-confirm-mb">
          <span className="flex1 grey">Amount</span>
          <span className="flex1 --tar">{props.amount} BTC</span>
        </div>
      </div>

      <div className="require-margin flex-row order-confirm-mb">
        <span className="flex1 grey">Required Margin</span>
        <span className="flex1 --tar">{props.margin} USDT</span>
      </div>

      <div className="confirm-button">
        <Button
          color={props.operation === "Open/Long" ?  "success" : "error"}
          className="confirm-button"
          variant="contained"
          onClick={props.onConfirm}
        >
          {props.operation}
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirm;

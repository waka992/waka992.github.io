import React from "react";
import "./ClosePosition.scss";
import { Button } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";

type Props = {
  onClose: () => void;
  onConfirm: () => void;
};

const ClosePosition = (props: Props) => {
  return (
    <div className="close-position">
      <div className="operate-title">
        Close Position
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
          <span className="flex1 --tar">{props.price} USDT</span>
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

export default ClosePosition;

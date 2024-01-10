import React, { useState } from "react";
import "./ReceiveConfirm.scss";
import { IoCloseSharp } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";
import { Button, TextField, InputAdornment } from "@mui/material";
import useShortStr from "@/hooks/useShortStr";
import Cookies from "js-cookie";
type Props = {
  balance: number;
  onClose: () => void;
  onConfirm: (number) => void;
};

const ReceiveConfirm = (props: Props) => {
  const shortStr = useShortStr(4, 4);
  const [amount, setAmount] = useState(0);
  const address = Cookies.get("address")
  const amountChange = (e) => {
    const value = e.target.value;
    if (value < 0) {
      return;
    }
    setAmount(value);
  };

  const confirmHandle = () => {
    props.onClose();
    props.onConfirm(amount);
  };

  return (
    <div className="receive-confirm" style={{ height: "50vh" }}>
      <div className="transaction-confirm-header">
        Receive Transaction
        <div className="close-button" onClick={props.onClose}>
          <IoCloseSharp />
        </div>
      </div>

      <div className="amount-input">
        <TextField
          className="amount-input-inner"
          variant="filled"
          size="small"
          type="number"
          value={amount}
          onChange={amountChange}
          sx={{
            paddingTop: "10px"
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                TON
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="receive-balance">
        <span>Balance: </span>
        <span>{props.balance}</span>
      </div>

      <div className="receive-address txn-confirm-mb">
        <span>Address: </span>
        <span className="address-info">{shortStr(address)}</span>
      </div>

      <div className="notice red txn-confirm-mb">
        <RiErrorWarningFill className="notice-icon" />
        Please confirm the transaction target address.
      </div>
      <div className="confirm-button-box">
        <Button
          className="confirm-button"
          variant="contained"
          onClick={confirmHandle}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default ReceiveConfirm;

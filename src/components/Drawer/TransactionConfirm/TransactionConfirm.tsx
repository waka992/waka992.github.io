import React, { useState } from "react";
import "./TransactionConfirm.scss";
import { IoCloseSharp } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";
import { Button, TextField, InputAdornment } from "@mui/material";
type Props = {
  onClose: () => void;
  onConfirm: (number) => void;
};

const TransactionConfirm = (props: Props) => {
  

  const [amount, setAmount] = useState(0);

  const amountChange = (e) => {
    const value = Number(e.target.value);
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
    <div className="transaction-confirm" style={{ height: "50vh" }}>
      <div className="transaction-confirm-header">
        Transaction
        <div className="close-button" onClick={props.onClose}>
          <IoCloseSharp />
        </div>
      </div>

      <div className="amount-input txn-confirm-mb">
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

      <div className="notice txn-confirm-mb">
        <RiErrorWarningFill className="notice-icon" />
        Please open the wallet mobile app before clicking the confirmation button. TON will send you a request for confirmation.
      </div>
      <div className="notice red txn-confirm-mb">
        <RiErrorWarningFill className="notice-icon" />
        IMPORTANT: Please do not close the waiting pop-up window before confirming the transaction in the app, otherwise the system will not be able to obtain the transfer information.
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

export default TransactionConfirm;

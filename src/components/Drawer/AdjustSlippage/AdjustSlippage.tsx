import React, { useState } from "react";
import "./AdjustSlippage.scss";
import { IoCloseSharp } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";
import { Button, TextField, Slider, InputAdornment } from "@mui/material";
type Props = {
  slippage: number;
  onClose: () => void;
  onConfirm?: (number) => void;
};

const AdjustSlippage = (props: Props) => {
  const marks = [
    {
      value: 1,
      label: "",
    },
    {
      value: 25,
      label: "25x",
    },
    {
      value: 50,
      label: "50x",
    },
    {
      value: 75,
      label: "75x",
    },
    {
      value: 100,
      label: "100x",
    },
    {
      value: 125,
      label: "",
    },
  ];

  const [slippage, setSlippage] = useState(props.slippage);

  const adjustSlippageChange = (e) => {
    const value = Number(e.target.value);
    if (value < 0 || value > 10) {
      return;
    }
    setSlippage(value);
  };

  const confirmHandle = () => {
    props.onConfirm(slippage);
    props.onClose();
  };

  return (
    <div className="adjust-slippage" style={{ height: "50vh" }}>
      <div className="adjust-leverage-header">
        Slippage Tolerance
        <div className="close-button" onClick={props.onClose}>
          <IoCloseSharp />
        </div>
      </div>

      <div className="leverage-input adjust-leverage-mb">
        <TextField
          className="leverage-input-inner"
          variant="filled"
          size="small"
          type="number"
          value={slippage}
          onChange={adjustSlippageChange}
        />
      </div>

      <div className="notice adjust-leverage-mb">
        <RiErrorWarningFill className="notice-icon" />
        Setting a higher slippage tolerance can increase the transaction rate,
        but the transaction price may deviate from the latest price. Please use
        it with caution.
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

export default AdjustSlippage;

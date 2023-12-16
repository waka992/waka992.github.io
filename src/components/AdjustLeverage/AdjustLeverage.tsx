import React, { useState } from "react";
import "./AdjustLeverage.scss";
import { IoCloseSharp } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";
import { Button, TextField, Slider, InputAdornment } from "@mui/material";
type Props = {
  lever: number;
  onClose: () => void;
};

const AdjustLeverage = (props: Props) => {
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

  const [lever, setLever] = useState(props.lever);

  const adjustLeverageChange = (e) => {
    const value = Number(e.target.value);
    if (value < 1 || value > 125) {
      return;
    }
    setLever(Math.round(value));
  };

  const confirmHandle = () => {
    props.onClose()
  }

  return (
    <div className="adjust-leverage" style={{ height: "50vh" }}>
      <div className="adjust-leverage-header">
        Adjust Leverage
        <div className="close-button" onClick={props.close}>
          <IoCloseSharp />
        </div>
      </div>

      <div className="leverage-input adjust-leverage-mb">
        <TextField
          className="leverage-input-inner"
          variant="filled"
          size="small"
          type="number"
          value={lever}
          onChange={adjustLeverageChange}
        />
      </div>
      <div className="leverage-range">
        <Slider
          value={lever}
          onChange={adjustLeverageChange}
          step={1}
          marks={marks}
          min={1}
          max={125}
          valueLabelDisplay="auto"
        />
      </div>
      {/* <div className="limit-text">
      • Maximum position at current leverage: 250,000 USDT
      </div> */}
      <div className="notice adjust-leverage-mb">
        • You can only increase leverage when holding isolated positions, please
        adjust your leverage accordingly.
      </div>
      <div className="notice --ischange down adjust-leverage-mb">
        <RiErrorWarningFill className="notice-icon" />
        Selecting higher leverage such as [10x] increases your liquidation risk.
        Always manage your risk levels.
      </div>
      <div className="confirm-button-box">
        <Button className="confirm-button" variant="contained" onClick={confirmHandle}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default AdjustLeverage;

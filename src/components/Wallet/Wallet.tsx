import React, { useCallback, useState } from "react";
import "./Wallet.scss";
import useShortStr from "@/hooks/useShortStr";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { FaRegCopy } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { RiWalletLine } from "react-icons/ri";
const Wallet = () => {
  const shortStr = useShortStr(4, 4);
  const [balanceVisiable, setBalanceVisiable] = useState(false);
  const switchBalanceVisiable = useCallback(() => {
    setBalanceVisiable(!balanceVisiable);
  }, [balanceVisiable]);
  return (
    <div className="wallet">
      <div className="address-box">
        <span className="address">0x8***04jx</span>
        <FaRegCopy className="copy-icon clickable" />
      </div>
      <div
          className="visible-icon clickable"
          onClick={switchBalanceVisiable}
        >
          {balanceVisiable ? <FiEyeOff /> : <FiEye />}
        </div>
      <div className="balance-box">
        {/* total balance */}
        <div className="balance-desc">TOTAL:</div>
        <span className="balance">
          {balanceVisiable ? `$${134.8123}` : `*****`}
        </span>
      
      </div>

      <div className="balance-detail-box flex-row">
        <div className="balance-surplus">
          <span className="surplus-desc">SURPLUS:</span>
          <span className="surplus-value">
            {balanceVisiable ? `$${15000.3432}` : `****`}
          </span>
        </div>
        <div className="freeze-balance-box">
          <span className="freeze-desc">FREEZE:</span>
          <span className="freeze-value">
          {balanceVisiable ? `$${15000.3333}` : `****`}
          </span>
        </div>
      </div>

      <div className="operate-btn">
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button size="small">
            <FiSend className="button-icon"/>
            Send
          </Button>
          <Button size="small">
            <RiWalletLine className="button-icon" />
            Receive
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Wallet;

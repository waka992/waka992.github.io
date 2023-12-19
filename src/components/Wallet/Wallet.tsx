import React, { useCallback, useEffect, useState } from "react";
import "./Wallet.scss";
import useShortStr from "@/hooks/useShortStr";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { FaRegCopy } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { RiWalletLine } from "react-icons/ri";
import {
  useTonConnectUI,
  useTonWallet,
  useIsConnectionRestored,
} from "@tonconnect/ui-react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import useTransaction from "@/hooks/useTransaction";
import { Drawer } from "@mui/material";
import TransactionConfirm from "../Drawer/TransactionConfirm/TransactionConfirm";

interface Props {
  address: string;
}

const Wallet = (props: Props) => {
  const shortStr = useShortStr(4, 4);
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false);
  const drawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const [balanceVisiable, setBalanceVisiable] = useState(false);
  const [tonConnectUI, setOptions] = useTonConnectUI();
  // const txn = useTransaction()
  const connectionRestored = useIsConnectionRestored();
  const switchBalanceVisiable = useCallback(() => {
    setBalanceVisiable(!balanceVisiable);
  }, [balanceVisiable]);


  const sendTxn = useCallback(() => {
    // txn()
    const tx: any = {
      validUntil: Date.now() + 1000000,
      messages: [
        {
          // address: "0QBTBIv702p5mocP2a7fb_ubIMTRxOcPDNojulE2LILctxkm", // destination address
          address:
            "0:412410771DA82CBA306A55FA9E0D43C9D245E38133CB58F1457DFB8D5CD8892F", // destination address
          amount: 20000000, //Toncoin in nanotons
        },
      ],
    };
    tonConnectUI.sendTransaction(tx);
  }, []);

  useEffect(() => {
  }, []);

  if (!connectionRestored) {
    return <div>Please wait...</div>;
  }

  return (
    <div className="wallet">
      <div className="address-box">
      <CopyToClipboard text={props.address}
          onCopy={() => setCopied(false)}>
            <div>
            <span className="address">
              {props.address && shortStr(props.address)}
            </span>
            <FaRegCopy className="copy-icon clickable" />
            </div>
        </CopyToClipboard>
      </div>
      <div className="visible-icon clickable" onClick={switchBalanceVisiable}>
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
          <Button size="small" onClick={sendTxn}>
            <FiSend className="button-icon" />
            Send
          </Button>
          <Button size="small">
            <RiWalletLine className="button-icon" />
            Receive
          </Button>
        </ButtonGroup>
      </div>

      <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
        <div style={{ height: "50vh" }}>
        <TransactionConfirm 
            onClose={() => setOpen(false)}
            />
        </div>
      </Drawer>
    </div>
  );
};

export default Wallet;

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
import { useTonConnectUI } from "@tonconnect/ui-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useTransaction from "@/hooks/useTransaction";
import { Drawer } from "@mui/material";
import TransactionConfirm from "../Drawer/TransactionConfirm/TransactionConfirm";
import ReceiveConfirm from "../Drawer/ReceiveConfirm/ReceiveConfirm";
import WebApp from "@twa-dev/sdk";
import useEncrypt from "@/hooks/useEncrypt";
import useAxios from "@/hooks/useAxios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
interface Props {
  address: string;
}

const Wallet = (props: Props) => {
  const shortStr = useShortStr(4, 4);
  const { encrypt } = useEncrypt();
  const { post } = useAxios();
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerOpen = () => {
    setOpen(true);
  };

  const [receiveOpen, setReceiveOpen] = useState(false);
  const receiveDrawerOpen = () => {
    setReceiveOpen(true);
  };

  const [balanceVisiable, setBalanceVisiable] = useState(false);
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const receiveTxn = useTransaction();
  const switchBalanceVisiable = useCallback(() => {
    setBalanceVisiable(!balanceVisiable);
  }, [balanceVisiable]);

  // balance query
  const [balance, setBalance] = useState(0);
  const [surplus, setSurplus] = useState(0);
  const [freeze, setFreeze] = useState(0);

  const getBalance = () => {
    const userId = WebApp.initDataUnsafe?.user?.id || "123123";
    const address = Cookies.get("address");
    if (!address) {
      return;
    }
    const signature = encrypt(`${userId}|${address}`);
    const params = {
      userId,
      address,
      signature,
    };
    interface Ires {
      userId: number;
      balance: number;
      availableBalance: number;
    }

    post("/user/queryBalance", params).then((res: Ires) => {
      console.log(res);
      setBalanceHandler(res.balance, res.availableBalance);
    });
  };

  const setBalanceHandler = (balance, available) => {
    if (!isNaN(Number(balance)) && !isNaN(Number(available))) {
      const freezeAmount = balance - available;
      setBalance(balance);
      setSurplus(available);
      setFreeze(freezeAmount);
    }
  };

  // send
  const sendTxn = async (value) => {
    const userid = WebApp.initDataUnsafe?.user?.id;
    if (!userid) {
      toast.error("Can not get userId, please reload this page");
      return;
    }
    if (!value) {
      return;
    }
    const txparams: any = {
      validUntil: Date.now() + 1000000,
      messages: [
        {
          address: "0QCy6Q-bU_W6sT0knC4JX48th3CNdxIsyQ02auoaGgwPhg8e", // test destination address
          amount: value * 10 ** 9, //Toncoin in nanotons
        },
      ],
    };
    const result = await tonConnectUI.sendTransaction(txparams);
    console.log(result.boc);
    if (result) {
      informBalance(value);
    }
  };

  const informBalance = (value) => {
    const userId = WebApp.initDataUnsafe?.user?.id || "123123";
    const address = Cookies.get("address");
    if (!address) {
      return;
    }
    const signature = encrypt(`${userId}|${address}`);
    const toAddress = (
      import.meta.env.TON_TEST_WALLET_ADDRESS || ""
    ).toString(); // 🔴 Change to your own, by creating .env file!
    const params = {
      userid: userId,
      address,
      signature,
      type: 0, // 1withdraw, 0deposite
      amount: value,
      toAddress,
    };
    post("/exchange/depositOrWithdraw", params).then(res => {
      if (res) {
        getBalance()
      }
    });
  };

  // receive
  const receiveConfirm = (value) => {
    const userid = WebApp.initDataUnsafe?.user?.id;
    if (!userid) {
      toast.error("Can not get userId, please reload this page");
      return;
    }
    const address = Cookies.get("address");
    if (!address) {
      return;
    }
    // receiveTxn(address, receiveInformBalance)
    receiveTxn(address, value, receiveInformBalance);
  };

  const receiveInformBalance = (value) => {
    const userId = WebApp.initDataUnsafe?.user?.id || "123123";
    const toAddress = Cookies.get("address");
    if (!toAddress) {
      return;
    }
    const address = (import.meta.env.TON_TEST_WALLET_ADDRESS || "").toString(); // 🔴 Change to your own, by creating .env file!
    const signature = encrypt(`${userId}|${address}`);
    const params = {
      userid: userId,
      address,
      signature,
      type: 1, // 1withdraw, 0deposite
      amount: value,
      toAddress,
    };
    post("/exchange/depositOrWithdraw", params).then((res) => {
      if (res) {
        getBalance()
      }
    });
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div className="wallet">
      <div className="address-box">
        <CopyToClipboard text={props.address} onCopy={() => setCopied(false)}>
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
          {balanceVisiable ? `$${balance}` : `*****`}
        </span>
      </div>

      <div className="balance-detail-box flex-row">
        <div className="balance-surplus">
          <span className="surplus-desc">SURPLUS:</span>
          <span className="surplus-value">
            {balanceVisiable ? `$${surplus.toFixed(2)}` : `****`}
          </span>
        </div>
        <div className="freeze-balance-box">
          <span className="freeze-desc">FREEZE:</span>
          <span className="freeze-value">
            {balanceVisiable ? `$${freeze.toFixed(2)}` : `****`}
          </span>
        </div>
      </div>

      <div className="operate-btn">
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button size="small" onClick={drawerOpen}>
            <FiSend className="button-icon" />
            Send
          </Button>
          <Button size="small" onClick={receiveDrawerOpen}>
            <RiWalletLine className="button-icon" />
            Receive
          </Button>
        </ButtonGroup>
      </div>

      <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
        <div style={{ height: "50vh" }}>
          <TransactionConfirm
            onConfirm={sendTxn}
            onClose={() => setOpen(false)}
          />
        </div>
      </Drawer>

      <Drawer
        anchor="bottom"
        open={receiveOpen}
        onClose={() => setReceiveOpen(false)}
      >
        <div style={{ height: "50vh" }}>
          <ReceiveConfirm
            balance={surplus}
            onConfirm={receiveConfirm}
            onClose={() => setReceiveOpen(false)}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default Wallet;

import React, { useCallback, useEffect, useState } from "react";
import "./OrderPage.scss";
import "@/styles/Tabs.css";
import TokenSwitch from "@/components/TokenSwitch/TokenSwitch";
import { FaCaretDown } from "react-icons/fa6";
// import { FiEdit } from "react-icons/fi";
import { RiFileList2Fill } from "react-icons/ri";
import { MdCandlestickChart } from "react-icons/md";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PositionList from "@/components/PositionList/PositionList";
import OrderingList from "@/components/OrderingList/OrderingList";
import CustomTabPanel from "@/components/CustomTabPanel/CustomTabPanel";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import AdjustLeverage from "@/components/Drawer/AdjustLeverage/AdjustLeverage";
import AdjustSlippage from "@/components/Drawer/AdjustSlippage/AdjustSlippage";
import OrderConfirm from "@/components/Drawer/OrderConfirm/OrderConfirm";
import useAxios from "@/hooks/useAxios";
import WebApp from "@twa-dev/sdk";
import Cookies from "js-cookie";
import useEncrypt from "@/hooks/useEncrypt";
import toast from "react-hot-toast";


const OrderPage = () => {
  // const routeParams = useLocation();
  const { post } = useAxios();
  const { encrypt } = useEncrypt();

  // if (routeParams && routeParams.state) {
  //   const { direction } = routeParams.state;
  // }
  const nav = useNavigate();

  const [index, setIndex] = React.useState(0);
  const [tokenSymbol, setTokenSymbol] = useState("BTCUSDT");

  // navigate
  const navToChage = useCallback(() => {
    nav("/market");
  }, []);

  const navToWallet = useCallback(() => {
    nav("/wallet");
  }, []);

  const navToHistory = useCallback(() => {
    nav("/history");
  }, []);

  // drawer
  const [open, setOpen] = useState(false);
  const adjustLeverageOpen = useCallback(() => {
    setOpen(!open);
  }, []);

  const [slippageOpen, setSlippageOpen] = useState(false);
  // const adjustSlippageOpen = useCallback(() => {
  //   setSlippageOpen(!slippageOpen);
  // }, []);

  const [confirmDrawerOpen, setConfirmDrawerOpen] = useState(false);
  const confirmDrawerOpenHandle = useCallback(() => {
    setConfirmDrawerOpen(true);
  }, []);

  const changeTokenSymbol = (value) => {
    setTokenSymbol(value);
  };

  // leverage
  const [lever, setLever] = useState(25);
  const leverChangeHandle = (value) => {
    if (value) {
      setLever(value);
    }
  };

  // slippage
  const [slippage, setSlippage] = useState(0.1);
  const slipChangeHandle = (value) => {
    if (value) {
      setSlippage(value);
    }
  };

  // price
  const [price, setPrice] = useState(0);
  const priceChange = (e) => {
    let value: any = e.target.value;
    value = value.replace(/^0+(?=\d)(?<!\.\d*?$)/, '');
    if (/^\d*\.?\d*$/.test(value) && (value >= 0 || value === '')) {
      setPrice(value);
    }
  };
  const formatPriceChange = (e) => {
    if (e.target.value) {
      const value = Number(e.target.value).toFixed(2);
      setPrice(Number(value));
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
  const formatAmountChange = (e) => {
    if (e.target.value) {
      const value = Number(e.target.value).toFixed(3);
      setAmount(Number(value));
    }
  };

  // balance
  const [balance, setBalance] = useState(0);
  const [surplus, setSurplus] = useState(0);
  const getBalance = useCallback(() => {
    const userId = WebApp.initDataUnsafe?.user?.id || "123123";
    const address = Cookies.get("address");
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
      if (res) {
        setBalanceHandler(res.balance, res.availableBalance);
      }
      else {
        setBalanceHandler(0, 0);
      }
    });
  }, []);

  const setBalanceHandler = (balance, available) => {
    if (!isNaN(Number(balance)) && !isNaN(Number(available))) {
      setBalance(balance);
      setSurplus(available);
    }
  };

  // order
  const [operation, setOperation] = useState("");
  const [margin, setMargin] = useState(0); // 保证金
  const order = useCallback((operation) => {
    // validate first
    setOperation(operation);
    confirmDrawerOpenHandle();
  }, []);

  const confirmOrder = useCallback(() => {
    const positionId = ""; // 仓位id，开单的情况下为空
    const userId = WebApp.initDataUnsafe?.user?.id || 123123;
    const symbol = tokenSymbol;
    const orderType = "LIMIT";
    const orderPrice = price;
    const orderAmount = amount;
    const leverage = 25;
    const direction = selectedDirection === "open" ? "LONG" : "SHORT";
    const reduceOnly = "true" // open => true, close => false

    const signature = encrypt(`${userId}`);

    const params = {
      positionId,
      userId,
      symbol,
      signature,
      orderType,
      orderPrice,
      amount: orderAmount,
      leverage,
      direction,
      reduceOnly
    };
    console.log(params);
    post("/exchange/OpenPerpetualOrder", params).then((res) => {
      console.log(res);
      toast.success("Order placed!")
      getBalance();
    });

    // send order
  }, [price, amount, lever, tokenSymbol]);

  // switch direction
  const [selectedDirection, setSelectedDirection] = useState("open");
  const swichOperaDirection = useCallback((direction) => {
    setSelectedDirection(direction);
  }, []);

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div className="order-page">
      <div className="order-token-control flex-row bottom-gap">
        <div className="order-token-control-left">
          <TokenSwitch
            tokenSymbol={tokenSymbol}
            changeTokenSymbol={changeTokenSymbol}
          />
        </div>

        <MdCandlestickChart
          className="order-token-control-right"
          onClick={navToChage}
        />
      </div>

      <div className="order-info flex-row bottom-gap">
        <div
          className="lever clickable order-base-color"
          onClick={adjustLeverageOpen}
        >
          <span>Leverage: </span>
          <span>{lever}x</span>
          <span>
            <FaCaretDown className="lever-icon" />
          </span>
        </div>

        <div className="order-fee">
          <div className="order-fee-title">Fee/Countdown</div>
          <div className="order-fee-value order-base-color">
            0.0184%/06:24:06
          </div>
        </div>
      </div>

      <div className="direction flex-row bottom-gap">
        <span
          className={`direction-button flex1 clickable direction-left ${
            selectedDirection === "open" ? "selected" : ""
          }`}
          onClick={() => swichOperaDirection("open")}
        >
          Open Position
        </span>
        <span
          className={`direction-button flex1 clickable direction-right ${
            selectedDirection === "close" ? "selected" : ""
          }`}
          onClick={() => swichOperaDirection("close")}
        >
          Close Position
        </span>
      </div>

      <div className="order-amount bottom-gap">
        <div className="balance bottom-gap">
          <span>Balance: </span>
          <span>{balance}</span>
          <span className="balance-trans clickable" onClick={navToWallet}>
            Transfer
          </span>
        </div>
        <div className="avaiable-amount flex-row">
          <span className="avaiable-amount-title">Available</span>
          <span className="avaiable-amount-value order-base-color">
            {surplus} USDT
          </span>
        </div>

        <div className="avaiable-amount flex-row">
          <span className="avaiable-amount-title">Margin</span>
          <span className="avaiable-amount-value order-base-color">
            {margin} USDT
          </span>
        </div>

        <div className="value-box">
          <div className="value-input flex-row">
            <div className="price-input-box flex1">
              <TextField
                type="number"
                className="price-input"
                sx={{ width: "95%" }}
                variant="filled"
                value={price}
                onBlur={formatPriceChange}
                onChange={priceChange}
              />
              <div className="price-input-placeholder">PRICE(USDT)</div>
            </div>

            <div className="amount-input-box flex1">
              <TextField
                className="amount-input"
                type="number"
                sx={{ width: "95%" }}
                value={amount}
                onBlur={formatAmountChange}
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
              <div className="price-input-placeholder">AMOUNT</div>
            </div>
          </div>
        </div>

        {/* <div className="slippage bottom-gap flex-row">
          <span className="slippage-title-intro">Slippage Tolerance</span>
          <span onClick={adjustSlippageOpen}>
            <span className="slippage-value order-base-color">{slippage}%</span>
            <FiEdit className="slippage-icon" />
          </span>
        </div> */}

        <div className="control-buttons">
          {selectedDirection === "open" ? (
            <div className="open-control flex-row">
              <div
                className="open-long-button control-button flex-column button-green flex1"
                onClick={() => order("Open/Long")}
              >
                <span className="button-text">Open/Long</span>
                <span className="calculate-value">≈0.003 BTC</span>
              </div>
              {/* <div className="open-short-button control-button flex-column button-red" onClick={() => order("Open/Short")}>
                <span className="button-text">Open/Short</span>
                <span className="calculate-value">≈0.003 BTC</span>
              </div> */}
            </div>
          ) : (
            <div className="open-control flex-row">
              {/* <div className="open-long-button control-button flex-column button-red" onClick={() => order("Close/Long")}>
                <span className="button-text">Close/Long</span>
                <span className="calculate-value">≈0.003 BTC</span>
              </div> */}
              <div
                className="open-short-button control-button flex-column button-red flex1"
                onClick={() => order("Close/Short")}
              >
                <span className="button-text">Close/Short</span>
                <span className="calculate-value">≈0.003 BTC</span>
              </div>
            </div>
          )}
        </div>

        <div className="tab-box">
          <RiFileList2Fill className="history-list clickable" onClick={navToHistory}/>
          <Tabs
            className="tabs"
            value={index}
            onChange={(event, value) => setIndex(value as number)}
          >
            <Tab
              sx={{
                color: "#333",
              }}
              label="Positions"
            />
            <Tab
              sx={{
                color: "#333",
              }}
              label="Orders"
            />
          </Tabs>
          <Box className="tabs-info flex1 flex-column" sx={{ padding: 0 }}>
            <CustomTabPanel value={index} index={0}>
              <Box>
                <MemoizedPositionList control={true}/>
              </Box>
            </CustomTabPanel>
          </Box>
          <Box className="tabs-info flex1 flex-column" sx={{ padding: 0 }}>
            <CustomTabPanel value={index} index={1}>
              <Box>
                <MemoizedOrderingList />
              </Box>
            </CustomTabPanel>
          </Box>
        </div>
      </div>

      <Drawer
        className="token-switch-drawer"
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={{ height: "50vh" }}>
          <AdjustLeverage
            lever={lever}
            onClose={() => setOpen(false)}
            onConfirm={leverChangeHandle}
          />
        </div>
      </Drawer>

      <Drawer
        anchor="bottom"
        open={slippageOpen}
        onClose={() => setSlippageOpen(false)}
      >
        <div style={{ height: "50vh" }}>
          <AdjustSlippage
            slippage={slippage}
            onClose={() => setSlippageOpen(false)}
            onConfirm={slipChangeHandle}
          />
        </div>
      </Drawer>

      <Drawer
        anchor="bottom"
        open={confirmDrawerOpen}
        onClose={() => setConfirmDrawerOpen(false)}
      >
        <div style={{ height: "50vh" }}>
          <OrderConfirm
            operation={operation}
            contract={tokenSymbol}
            price={price}
            amount={amount}
            margin={margin}
            onClose={() => setConfirmDrawerOpen(false)}
            onConfirm={confirmOrder}
          />
        </div>
      </Drawer>
    </div>
  );
};

const MemoizedPositionList = React.memo(PositionList)
const MemoizedOrderingList = React.memo(OrderingList)
export default OrderPage;

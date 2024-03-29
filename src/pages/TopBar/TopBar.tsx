import React, { useCallback, useEffect, useState } from "react";
import "./TopBar.scss";
import ConnectButton from "@/components/ConnectButton/ConnectButton";
import { FaBars } from "react-icons/fa6";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";

const TopBar = () => {
  const nav = useNavigate()
  const location = useLocation()
  const routeList = [
    {name:"Home", route: "/"},
    {name:"Market", route: "/market"},
    {name:"Trade", route: "/trade"},
    {name:"Wallet",route: "/wallet"},
  ]
  const [open, setOpen] = useState(false);
  const [showBar, setShowBar] = useState(true)
  const switchPage = useCallback((route) => {
    setOpen(false)
    nav(route)
  }, [])

  useEffect(() => {
    const {pathname} = location
    if (pathname.indexOf("history") !== -1) {
      setShowBar(false)
    }
    else {
      setShowBar(true)
    }
  }, [location])

  return (
    showBar && (
    <div className="top-bar">
      {/* <header className="title">BEST BIT</header> */}
      <ConnectButton />
      <FaBars
        className="setting-icon clickable"
        onClick={() => setOpen(true)}
      ></FaBars>
      <Drawer className="topbar-drawer" anchor="right" open={open} onClose={() => setOpen(false)}>
        <div className="switch-box" style={{ width: "calc(80vw)" }}>
          <div className="close-bar" onClick={() => setOpen(false)}></div>
          <div className="route-selector">
          {routeList.map((item, index) => {
            return(
            <div className="route-options" key={index}>
                <Button className="route-button" variant="outlined" onClick={() => switchPage(item.route)}>{item.name}</Button>
            </div>
            )
          })}
          </div>
        </div>
      </Drawer>
    </div>)
  );
};

export default TopBar;

import React from "react";
import "./HistoryPage.scss";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
  const nav = useNavigate();
  const back = () => {
    nav(-1);
  };
  return <div>HistoryPage</div>;
};

export default HistoryPage;

import React, { useEffect } from "react";
import "./HomePage.scss";
// component
import QuoteInfo from "@/components/QuoteInfo/QuoteInfo";
import imgurl from "/src/assets/img/index1.png"
const HomePage = () => {

  return (
    <div className="home-page flex-column">
      <div className="intro">
        <img src={imgurl} alt="Best Bit" />
      </div>
      <div className="quotes flex-column">
        <QuoteInfo />
      </div>
    </div>
  );
};

export default HomePage;

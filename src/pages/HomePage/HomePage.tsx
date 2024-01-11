import React, { useEffect } from "react";
import "./HomePage.scss";
// component
import QuoteInfo from "@/components/QuoteInfo/QuoteInfo";
import useAxios from "@/hooks/useAxios";
import imgurl from "/src/assets/img/index1.png"
const HomePage = () => {
  const { post } = useAxios();
  const fetchTradeData = () => {
    // try {}
    post("/coinmarket/price", {
    }).then((res) => {
      console.log(res);
    }).catch(err=> {
      console.log("coinmarketerror", err)
    });
  };

  useEffect(() => {
    fetchTradeData();
  }, []);

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

import React, { useEffect } from "react";
import "./HomePage.scss";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
// component
import QuoteInfo from "@/components/QuoteInfo/QuoteInfo";
import useAxios from "@/hooks/useAxios";

const HomePage = () => {
  const [typeValue, setTypeValue] = React.useState("T20");
  const handleTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    setTypeValue(newValue);
  };
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
        <img src="src/assets/index1.png" alt="Best Bit" />
      </div>
      <div className="quotes flex-column">
        {/* <ToggleButtonGroup
          value={typeValue}
          color="primary"
          exclusive
          onChange={handleTypeChange}
        >
          <ToggleButton value="T20">TON-20</ToggleButton>
          <ToggleButton value="T20A">TON-20A</ToggleButton>
          <ToggleButton value="T20L">TON-20L</ToggleButton>
        </ToggleButtonGroup> */}

        <QuoteInfo />
      </div>
    </div>
  );
};

export default HomePage;

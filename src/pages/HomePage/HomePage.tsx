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
  const { get } = useAxios();
  // https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest
  const fetchTradeData = () => {
    get(
      // "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=08a546d3-d8bb-4205-8de8-28e3c7375906",
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=20&convert=USD&CMC_PRO_API_KEY=08a546d3-d8bb-4205-8de8-28e3c7375906",
      {
      //   headers: {
      //     "CMC_PRO_API_KEY": "08a546d3-d8bb-4205-8de8-28e3c7375906",
      //   },
      }
    ).then(res => {
      console.log(res)
    })
  };

  useEffect(() => {
    fetchTradeData();

  }, [])
  
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

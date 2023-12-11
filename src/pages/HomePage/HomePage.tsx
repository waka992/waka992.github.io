import React from "react";
import "./HomePage.scss";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from '@mui/material/ToggleButton';
// component
import QuoteInfo from "@/components/QuoteInfo/QuoteInfo";

const HomePage = () => {
  const [typeValue, setTypeValue] = React.useState('T20');
  const handleTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string,
  ) => {
    setTypeValue(newValue);
  };
  return (
    <div className="home-page flex-column">
      <div className="intro"></div>
      <div className="quotes flex-column">
        <ToggleButtonGroup
          value={typeValue}
          color="primary"
          exclusive
          onChange={handleTypeChange}
        >
          <ToggleButton value="T20">TON-20</ToggleButton>
          <ToggleButton value="T20A">TON-20A</ToggleButton>
          <ToggleButton value="T20L">TON-20L</ToggleButton>
        </ToggleButtonGroup>

        <QuoteInfo />
      </div>
    </div>
  );
};

export default HomePage;

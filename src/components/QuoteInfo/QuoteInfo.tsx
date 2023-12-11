import React from "react";
import "./QuoteInfo.scss";
import "@/styles/Tabs.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// components
import TokenList from "../TokenList/TokenList";
import CustomTabPanel from "../CustomTabPanel/CustomTabPanel";



const QuoteInfo = () => {
  const [index, setIndex] = React.useState(0);

  return (
    <div className="quote-info flex-column flex1">
      <Tabs
        className="tabs"
        value={index}
        onChange={(event, value) => setIndex(value as number)}
      >
        <Tab
          sx={{
            color: "#333",
          }}
          label="Trade"
        />
        {/* <Tab
          sx={{
            color: "#333",
          }}
          label="Mint"
        /> */}
      </Tabs>
      <Box className="quote-content tabs-info flex1 flex-column" sx={{padding: 0}}>
        <CustomTabPanel value={index} index={0}>
          <TokenList />
        </CustomTabPanel>
        {/* <CustomTabPanel value={index} index={1}>
          <Box>Library</Box>
        </CustomTabPanel> */}
      </Box>
    </div>
  );
};

export default QuoteInfo;

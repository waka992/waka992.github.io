import React, { useEffect, useState } from "react";
import "./TokenList.scss";
import SortArrow from "../SortArrow/SortArrow";
import useAxios from "@/hooks/useAxios";
import Skeleton from "@mui/material/Skeleton";

const TokenList = () => {
  const [filter, setFilter] = useState({
    target: "volume",
    direction: "volume",
  });

  const { get } = useAxios();
  const fetchTradeData = () => {
    // try {}
    get("/coinmarket/price", {
    }).then((res) => {
      console.log(res);
      if (res && res.data) {
        const list = res.data.slice(0,20)
        setTradeList(list)
      }
    }).catch(err=> {
      console.log("coinmarketerror", err)
    });
  };


  
  const [tradeList, setTradeList] = useState<any>([
    // { symbol: "BTC", quote: {usd: {volume_24h: 0, price: 0,percent_change_24h:0}}, price: 19.293, change: -90.43 },
  ]);

  const filterClick = (target) => {
    let direction = "";
    if (target === filter.target) {
      direction = filter.direction === "volume" ? "asc" : "volume";
    } else {
      direction = "volume";
    }
    setFilter({ target, direction });
  };

  useEffect(() => {
    fetchTradeData();
  }, []);

  return (
    <div className="token-list flex-column">
      <div className="token-header flex-row">
        <div
          className="token-header-item clickable"
          onClick={() => filterClick("volume")}
        >
          <span>Pair</span>
          <span className="token-header-sort">
            <SortArrow
              direct={filter.target === "volume" ? filter.direction : ""}
            />
          </span>
        </div>

        <div className="token-header-item">
          <span>Last price</span>
        </div>

        <div
          className="token-header-item clickable"
          onClick={() => filterClick("change")}
        >
          <span>Change</span>
          <span className="token-header-sort">
            <SortArrow
              direct={filter.target === "change" ? filter.direction : ""}
            />
          </span>
        </div>
      </div>

      <div className="token-box flex1">
       { tradeList.length !== 0 ?
        tradeList.map((item, key) => {
          return (
            <div className="token-item" key={key}>
              <div className="token-info">
                <div className="token-pair">{item.symbol}/USDT</div>
                {/* <div className="token-volume">{item.quote.usd.volume_24h.toFixed(0)}</div> */}
              </div>
              <div className={`${item.quote.usd.percent_change_24h < 0 ? "down" : "up"} token-price`}>{item.quote.usd.price.toFixed(2)}</div>
              <div className={`${item.quote.usd.percent_change_24h < 0 ? "down" : "up"} token-change`}>
                {item.quote.usd.percent_change_24h.toFixed(2)}%
              </div>
            </div>
          );
        })
        :
        <div
        style={{marginTop: "20px"}}
        >
          <Skeleton
            variant="rectangular"
            width={310}
            height={"20px"}
            sx={{ marginTop: "14px", borderRadius: "10px" }}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            width={210}
            height={"20px"}
            sx={{ marginTop: "14px", borderRadius: "10px" }}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            width={210}
            height={"20px"}
            sx={{ marginTop: "14px", borderRadius: "10px" }}
            animation="wave"
          />
        </div>
        }
      </div>
    </div>
  );
};

export default TokenList;

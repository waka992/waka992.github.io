import React, { useContext } from 'react'
import "./MarketPage.scss"
import Chart from '@/components/Chart/Chart'
import GlobalContext from "@/store/global-context";
import useAxios from '@/hooks/useAxios';

const MarketPage = () => {
  const globalCtx = useContext(GlobalContext);
  
  console.log(globalCtx)
  return (
    <div className='market-page'>
        <Chart />
    </div>
  )
}

export default MarketPage
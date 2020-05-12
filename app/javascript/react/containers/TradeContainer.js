import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";

import TradeTile from "../components/TradeTile"

const TradeContainer = (props) => {
  const [accountBalance, setAccountBalance] = useState()
  const [errors, setErrors] = useState("")
  const [trades, setTrades] = useState([])

  useEffect(() => {
    fetchTrades()
  }, []);

  const fetchTrades = () => {
    fetch(`/api/v1/trades`)
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`;
        let error = new Error(errorMessage);
        throw error;
      }
    })
    .then((response) => response.json())
    .then((body) => {
      setTrades(body["trades"]);
      setAccountBalance(body["balance"].toFixed(2))
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }
  const errorTrigger = (event) => {
    setErrors("Server time out, please wait a minute and refresh the page")
  }

  let tradeTiles
  let tradeOverview
  if (trades.length !== 0){
    tradeOverview ="Shares Owned:"
    tradeTiles = trades.map((company) => {
      return <TradeTile
                key={company[0]["id"]}
                company={company[0]["symbol"]}
                id={company[0]["id"]}
                buyPrice={company[0]["buy_price"]}
                quantity={company[0]["quantity"]}
                fetchTrades={fetchTrades}
                sellPrice={company[1]}
                />
    })
  }

  return (
    <div>
      <div className="nav-bar">
        <Link to="/follow"> Follows</Link>
        <Link to="/search"> Search</Link>
      </div>
      <h3>Account Balance: ${accountBalance}</h3>
      {tradeTiles}
    </div>
  )
}
export default TradeContainer;

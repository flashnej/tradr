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

  let portfolioValue = 0
  trades.forEach((company) => {
    portfolioValue = portfolioValue + (Number(company[1]) * Number(company[0].quantity))
  })

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
        <span className="active">Trades</span> /
        <span className="not-active"><Link to="/follow"> Follows </Link></span>/
        <span className="not-active"><Link to="/search"> Search</Link></span>
      </div>
      <div className="grid-container">
        <div className="gird-x grid-margin-x">
        <div className="balances">
          <div className="columns cell small-6">
            <p>Account Balance: ${accountBalance}</p>
          </div>
          <div className="columns cell small-6">
            <p>Porfolio Balance: ${portfolioValue.toFixed(2)}</p>
          </div>
          </div>
        </div>
        <div className="grid-x grid-margin-x">
          {tradeTiles}
        </div>
      </div>
    </div>
  )
}
export default TradeContainer;

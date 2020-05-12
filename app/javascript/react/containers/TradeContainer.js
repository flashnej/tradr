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
  debugger
  const errorTrigger = (event) => {
    setErrors("Server time out, please wait a minute and refresh the page")
  }

  const sell = (event) => {
    event.preventDefault()
    debugger
    fetch(`/api/v1/trades/${event.target.id}`, {
      method: "PATCH",
      body: JSON.stringify({sell_price: props.sellPrice, quantity: sellQuantity}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.ok) {
        props.fetchTrades();
      } else {
        let errorMessage = `${response.status} (${response.statusText})`;
        let error = new Error(errorMessage);
        throw error;
      }
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  let sellQuantity = 1
  const updateSellQuantity= (event) => {
    sellQuantity = event.target.value
  }

  const setSellPrice = (price) => {
    let sellPrice = price
  }

  let tradeTiles
  let tradeOverview
  // if (trades.length !== 0){
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
                sell={sell}
                updateSellQuantity={updateSellQuantity}
                setSellPrice={setSellPrice}
                />
    })
  // }

  return (
    <div>
    <Link to="/search"> Explore Additional Companies</Link>
    <h3>Account Balance: ${accountBalance}</h3>
      {tradeTiles}
    </div>
  )
}
export default TradeContainer;

import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import _ from "lodash";

import PerformanceTile from "../components/PerformanceTile"
import TradeTile from "../components/TradeTile"

const FollowingContainer = (props) => {
  const [follows, setFollows] = useState([])
  const [accountBalance, setAccountBalance] = useState()
  const [errors, setErrors] = useState("")
  const [trades, setTrades] = useState([])

  useEffect(() => {
    fetchFollows()
    fetchTrades()
  }, []);

  const fetchFollows = () => {
    fetch(`/api/v1/follows`)
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
      setFollows(body.follows);
      setAccountBalance(body.balance.toFixed(2));
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

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
      setTrades(body);
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  const errorTrigger = (event) => {
    setErrors("Server time out, please wait a minute and refresh the page")
  }

  let followTiles
  if (follows.length !== 0){
    followTiles = follows.map((company) => {
      return <PerformanceTile
                key={company["id"]}
                company={company["symbol"]}
                id={company["id"]}
                fetchFollows={fetchFollows}
                errorTrigger={errorTrigger}
                />
    })
  }

  let tradeTiles
  if (trades.length !== 0){
    tradeTiles = trades.map((company) => {
      return <TradeTile
                key={company["id"]}
                company={company["symbol"]}
                id={company["id"]}
                buyPrice={company["buy_price"]}
                quantity={company["quantity"]}
                fetchTrades={fetchTrades}
                fetchFollows={fetchFollows}
                />
    })
  }

  return (
    <div className="grid-container">
      <p> {errors} </p>
      <p> Your account balance is ${accountBalance}</p>
      <h4> Shares Owned: </h4>
      <div className="grid-margin-x grid-x">
      {tradeTiles}
      </div>
      <h4> Companies Followed: </h4>
      {followTiles}
      <Link to="/search"> Follow Additional Companies</Link>
    </div>
  )
}
export default FollowingContainer;

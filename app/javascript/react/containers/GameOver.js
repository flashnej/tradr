import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";


const GameOver = (props) => {
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
      setAccountBalance(parseFloat(body["balance"]))
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  let portfolioValue = 0
  trades.forEach((company) => {
    portfolioValue = portfolioValue + (Number(company[1]) * Number(company[0].quantity))
  })

  let accountValue
  if (accountBalance) {
    accountValue = accountBalance + portfolioValue
    accountValue = accountValue.toFixed(2)
  }

  return (
    <div className="gameover">
      <h2> Game Over! </h2>
      <p> Final Balance: ${accountValue}</p>
    </div>
  )
}
export default GameOver;

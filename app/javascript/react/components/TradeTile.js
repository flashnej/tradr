import React, { useState, useEffect } from "react";

const TradeTile = (props) => {
  const [sellQuantity, setSellQuantity] = useState(1)

  const quantity = props.quantity

  const company = props.company

  let share = "share"
  if (quantity > 1) {
    share = "shares"
  }

  let sellOptions = []
    for (let i = 1; i <= props.quantity; i++) {
      sellOptions.push(<option key={i} value={i}>{i}</option>);
    }

    const updateSellQuantity= (event) => {
      setSellQuantity(event.target.value)
    }

    const sell = (event) => {
      event.preventDefault()
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

  return (
    <div className="tradeTile columns cell small-3">
      <p>Purchased {quantity} {share} of {props.company} for: ${props.buyPrice}</p>
      <p>Sell for {props.sellPrice} per share?</p>
      <form id={props.id} onSubmit={sell}>
        <label>Quantity:
          <select id="quantity" onChange={updateSellQuantity} className="sell-dropdown">
            {sellOptions}
          </select>
        </label>
        <input className="button" type="submit" id={props.id} value="Sell" />
      </form>
    </div>
  )
};

export default TradeTile;

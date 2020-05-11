import React, { useState, useEffect } from "react";

const TradeTile = (props) => {
  const [price, setPrice] = useState()

  const quantity = props.quantity

  const company = props.company
  useEffect(() => {
    fetch(`/api/v1/search_stocks/${company}`)
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
      if (body.error) {
        setErrors(body.error)
      } else {
        setPrice(`$${body}`);
    }
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  let sellOptions=[]
  for (let i = 1; i <= quantity; i++) {
    sellOptions.push(<option key={i} value={i}>{i}</option>);
  }
  let sellQuantity = 1
  const updateSellQuantity= (event) => {
    sellQuantity = event.target.value
  }

  const sell = (event) => {
    event.preventDefault()
    fetch(`/api/v1/trades/${event.target.id}`, {
      method: "PATCH",
      body: JSON.stringify({sell_price: price, quantity: sellQuantity}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.ok) {
        props.fetchTrades();
        props.fetchFollows();
      } else {
        let errorMessage = `${response.status} (${response.statusText})`;
        let error = new Error(errorMessage);
        throw error;
      }
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  let share = "share"
  if (quantity > 1) {
    share = "shares"
  }

  let tile
  if (quantity !== 0) {
    tile =  <div className="tradeTile columns cell small-3">
              <p>Purchased {quantity} {share} of {props.company} for: ${props.buyPrice}</p>
              <p>Sell for {price} per share?</p>
              <label>Quantity:
                <select id="quantity" onChange={updateSellQuantity} className="sell-dropdown">
                  {sellOptions}
                </select>
              </label>
              <input className="button" type="submit" id={props.id} value="Sell" onClick={sell} />
            </div>
  } else {
    tile = null
  }

    return (tile);
};

export default TradeTile;

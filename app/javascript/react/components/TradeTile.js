import React, { useState, useEffect } from "react";

const TradeTile = (props) => {
  const [price, setPrice] = useState()

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

  const sell = (event) => {
    event.preventDefault()
    fetch(`/api/v1/trades/${event.target.id}`, {
      method: "PATCH",
      body: JSON.stringify({sell_price: price}),
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
  if (props.quantity > 1) {
    share = "shares"
  }

  let tile
  if (props.quantity !== 0) {
    tile =  <div className="tradeTile columns cell small-3">
              <p>Purchased {props.quantity} {share} of {props.company} for: ${props.buyPrice}</p>
              <p>Sell for {price} per share?</p>
              <input className="button" type="submit" id={props.id} value="Sell" onClick={sell} />
            </div>
  } else {
    tile = null
  }

    return (tile);
};

export default TradeTile;

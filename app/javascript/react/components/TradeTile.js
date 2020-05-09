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

  let share = "share"
  if (props.quantity > 1) {
    share = "shares"
  }

    return (
        <div>
          <p>Purchased {props.quantity} {share} of {props.company} share for: ${props.buyPrice}</p>
          <p>Sell for {price} per share?</p>
        </div>
    );
};

export default TradeTile;

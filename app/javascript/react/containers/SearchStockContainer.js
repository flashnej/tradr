import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import _ from "lodash";

import ErrorList from "../components/ErrorList.js";

const SearchStockContainer = (props) => {
  const [errors, setErrors] = useState({})
  const [symbol, setSymbol] = useState("")
  const [price, setPrice] = useState()


  const handleChange = (event) => {
    setSymbol(event.currentTarget.value)
  };

  const onSubmit = (event) => {
    event.preventDefault()
    fetch(`/api/v1/stocks/${symbol}`)
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
      setPrice(body);
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
};

  return (
    <div>
    <h4> What company are you looking for? </h4>
    <ErrorList errors={errors} />
    <form onSubmit={onSubmit}>
      <label>
        Symbol:
        <input
          type="text"
          id="symbol"
          onChange={handleChange}
          value={symbol}
        />
      </label>

      <input className="button" type="submit" value="Submit" />
    </form>
    {price}
    </div>
  )
}
export default SearchStockContainer;

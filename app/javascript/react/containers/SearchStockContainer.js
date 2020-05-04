import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import _ from "lodash";

import ErrorList from "../components/ErrorList.js";
import ShareTile from "../components/ShareTile"

const SearchStockContainer = (props) => {
  const [errors, setErrors] = useState({})
  const [symbol, setSymbol] = useState("")
  const [company, setCompany] = useState("")
  const [price, setPrice] = useState()


  const handleChange = (event) => {
    setSymbol(event.currentTarget.value)
  };

  const onSubmit = (event) => {
    event.preventDefault()
    fetch(`/api/v1/search_stocks/${symbol}`)
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
      setPrice(`$${body}`);
      setCompany(symbol)
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
};

const follow = (event) => {
  event.preventDefault()

}

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
      <ShareTile
        company={company}
        price={price}
        follow={follow}
      />
    </div>
  )
}
export default SearchStockContainer;

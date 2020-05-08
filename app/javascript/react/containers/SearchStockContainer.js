import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import _ from "lodash";

import ErrorList from "../components/ErrorList.js";
import ShareTile from "../components/ShareTile"

const SearchStockContainer = (props) => {
  const [errors, setErrors] = useState("")
  const [symbol, setSymbol] = useState("")
  const [company, setCompany] = useState("")
  const [price, setPrice] = useState()
  const [redirect, setRedirect] = useState(false)


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
      if (body.error) {
        setErrors(body.error)
      } else {
        setPrice(`$${body}`);
        setCompany(symbol)
        setErrors("")
    }
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  const follow = (event) => {
    event.preventDefault()
    fetch("/api/v1/follows", {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify({symbol: company}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        response.json().then((body) => setErrors(body.error));
        let errorMessage = `${response.status} (${response.statusText})`;
        let error = new Error(errorMessage);
        throw error;
      }
    })
    .then((response) => response.json())
    .then((body) => {
      if (body["error"]) {
        setErrors(body["error"])
      } else {
        setRedirect(true)
      }
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  if (redirect) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <h4> What company are you looking for? </h4>
      <p> {errors} </p>
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

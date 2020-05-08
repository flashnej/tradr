import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import _ from "lodash";

import PerformanceTile from "../components/PerformanceTile"

const FollowingContainer = (props) => {
  const [portfolioCompanies, setPortfolioCompanies] = useState([])
  const [errors, setErrors] = useState("")

  useEffect(() => {
    fetchFollows()
  }, []);

  const fetchFollows = () =>{
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
      setPortfolioCompanies(body);
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  const errorTrigger = (event) => {
    setErrors("Server time out, please wait a minute and refresh the page")
  }

  let portfolio
  if (portfolioCompanies.length !== 0){
    portfolio = portfolioCompanies.map((company) => {
      return <PerformanceTile
                key={company["id"]}
                company={company["symbol"]}
                id={company["id"]}
                fetchFollows={fetchFollows}
                errorTrigger={errorTrigger}
                />
    })
  }

  return (
    <div>
    <p> {errors} </p>
      {portfolio}
      <Link to="/search"> Follow Additional Companies</Link>
    </div>
  )
}
export default FollowingContainer;

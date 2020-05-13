import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";

import PerformanceTile from "../components/PerformanceTile"

const FollowContainer = (props) => {
  const [follows, setFollows] = useState([])
  const [accountBalance, setAccountBalance] = useState()

  useEffect(() => {
    fetchFollows()
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
      setFollows(body.data);
      setAccountBalance(body.balance.toFixed(2));
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  const unfollow = (event) => {
    event.preventDefault()
    let id = event.target.id
    fetch(`/api/v1/follows/${id}`, {
    credentials: "same-origin",
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        fetchFollows();
      } else {
        let errorMessage = `${response.status} (${response.statusText})`;
        let error = new Error(errorMessage);
        throw error;
      }
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  const errorTrigger = (event) => {
    setErrors("Server time out, please wait a minute and refresh the page")
  }

  let followTiles
  let followOverview
  if (follows.length !== 0){
    followOverview=="Companies Followed: "
    followTiles = follows.map((company) => {
      if (company[2]["Note"]) {
        return <h6 key={company[0]} className="callout alert"> This chart could not render due to a server timeout, please wait a minute and try again. </h6>
      } else {
      let data = []
      let dates = Object.keys(company[2]["Time Series (Daily)"])
      dates.map((day) => {
        return data.push([day, parseFloat(company[2]["Time Series (Daily)"][day]["4. close"])])
      })
      data.reverse()
      data.unshift(["date", "Price"])
      return <PerformanceTile
                key={company[0]}
                company={company[1]}
                id={company[0]}
                data={data}
                fetchFollows={fetchFollows}
                errorTrigger={errorTrigger}
                unfollow={unfollow}
                />
      }
    })
  }

  return (
    <div>
      <div className="nav-bar">
        <Link to="/trade"> Trades</Link> /
        <Link to="/search"> Search</Link>
      </div>
      <div>
        {followTiles}
      </div>
    </div>
  )
}
export default FollowContainer;

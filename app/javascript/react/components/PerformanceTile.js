import React, { useState, useEffect } from "react";
import { Chart } from 'react-google-charts';

const PerformanceTile = (props) => {
  const [priceHistory, setPriceHistory] = useState({})

  useEffect(() => {
    fetchPriceHistory(props.company)
  }, []);

  const fetchPriceHistory = (company) => {
    fetch(`/api/v1/follows/${company}`)
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
        if (body["Note"]) {
          errorTrigger()
        } else {
          setPriceHistory(body);
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  let chart = <> </>
  if (Object.keys(priceHistory).length !== 0) {
    let data = []
    let dates = Object.keys(priceHistory)
    dates.map((day) => {
      return data.push([day, parseFloat(priceHistory[day]["4. close"])])
    })
    data.reverse()
    data.unshift(["date", "price"])
    chart = (
          <Chart
            chartType="LineChart"
            data={data}
            options={{}}
            graph_id="LineChart"
            width="100%"
            height="400px"
          />
    )}

    const unfollow = (event) => {
      event.preventDefault()
      let symbol = props["id"]
      fetch(`/api/v1/follows/${symbol}`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          props.fetchFollows();
        } else {
          let errorMessage = `${response.status} (${response.statusText})`;
          let error = new Error(errorMessage);
          throw error;
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
    }

    return (
      <div className={'my-pretty-chart-container'}>
        <div className="row">
          <div className="columns small-6"><h2>{props.company}'s Recent Performance</h2></div>
          <div className="columns small-6"><button type="button" className="alert button" onClick={unfollow}>Delete</button></div>
          </div>
        {chart}
      </div>
    );
};

export default PerformanceTile;

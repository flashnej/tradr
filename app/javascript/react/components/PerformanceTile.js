import React, { useState, useEffect } from "react";
import { Chart } from 'react-google-charts';

const PerformanceTile = (props) => {
  const [priceHistory, setPriceHistory] = useState({})

  useEffect(() => {
    fetch(`/api/v1/follows/${props.company}`)
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
          props.errorTrigger()
        } else {
          setPriceHistory(body);
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

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
    )



  }
    return (
      <div className={'my-pretty-chart-container'}>
        <div>
        <h2>{props.company}'s Recent Performance</h2>
        {chart}
        </div>
      </div>
    );
};

export default PerformanceTile;

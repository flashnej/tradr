import React, { useState, useEffect } from "react";
import { Chart } from 'react-google-charts';

const PerformanceGraph = (props) => {
    let chart = (
          <Chart
            chartType="LineChart"
            data={props.data}
            options={{}}
            graphId={props.id}
            width="100%"
            height="200px"
            borderRadius="5px"
          />
    )

    return (
      <div className="grid-container performanceGraph">
        <div className={'my-pretty-chart-container'}>
          <div className="grid-margin-x grid-x">
            <div className="columns cell small-10 performanceGraph-title"><p>Recent Performance</p></div>
            {chart}
          </div>
        </div>
      </div>
    );
};

export default PerformanceGraph;

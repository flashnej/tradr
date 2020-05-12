import React, { useState, useEffect } from "react";
import { Chart } from 'react-google-charts';

const PerformanceTile = (props) => {

    let chart = (
          <Chart
            chartType="LineChart"
            data={props.data}
            options={{}}
            graphId={props.id}
            width="90%"
            height="400px"
          />
    )

    return (
      <div className="grid-container">
        <div className={'my-pretty-chart-container'}>
          <div className="grid-margin-x grid-x">
            <div className="columns cell small-10 table-title"><h6>{props.company}'s Recent Performance</h6></div>
            <div className="columns cell small-2"><button type="button" id={props.id} className="alert button delete" onClick={props.unfollow}>Delete</button></div>
            {chart}
          </div>
        </div>
      </div>
    );
};

export default PerformanceTile;

import React, { useState, useEffect } from "react";
import { Chart } from 'react-google-charts';

const FollowGraph = (props) => {

    let chart = (
          <Chart
            chartType="LineChart"
            data={props.data}
            options={{}}
            graphId={props.id}
            width="100%"
            height="400px"
            borderRadius="5px"
          />
    )

    return (
      <div className="grid-container followGraph">
        <div className={'my-pretty-chart-container'}>
          <div className="grid-margin-x grid-x">
            <div className="columns cell small-10 table-title"><h4>{props.company}'s Recent Performance</h4></div>
            <div className="columns cell small-2 delete-button"><button type="button" id={props.id} className="alert button" onClick={props.unfollow}>Unfollow</button></div>
            {chart}
          </div>
        </div>
      </div>
    );
};

export default FollowGraph;

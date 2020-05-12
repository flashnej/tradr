import React, { useState, useEffect } from "react";

const TradeTile = (props) => {
  const quantity = props.quantity
  const company = props.company

  let share = "share"
  if (quantity > 1) {
    share = "shares"
  }

  let sellOptions = []
    for (let i = 1; i <= props.quantity; i++) {
      sellOptions.push(<option key={i} value={i}>{i}</option>);
    }

  return (
    <div className="tradeTile columns cell small-3">
      <p>Purchased {quantity} {share} of {props.company} for: ${props.buyPrice}</p>
      <p>Sell for {props.sellPrice} per share?</p>
      <form id={props.id} onSubmit={props.sell}>
        <label>Quantity:
          <select id="quantity" onChange={props.updateSellQuantity} className="sell-dropdown">
            {sellOptions}
          </select>
        </label>
        <input className="button" type="submit" id={props.id} value="Sell" />
      </form>
    </div>
  )
};

export default TradeTile;

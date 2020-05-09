import React, { useState } from "react";

const ShareTile = (props) => {

  let followButton = <> </>;
  if (props.price) {
    followButton = <form onSubmit={props.follow}>
      <input className="button" type="submit" value="Follow Company" />
    </form>
  } else {
    followButton = <> </>
  }

  let purchaseForm = <> </>;
  if (props.price) {
    purchaseForm = <form onSubmit={props.buy}>
    <label>Quantity:
      <select id="quantity" value={props.quantity} onChange={props.handleChange}>
        <option value=""></option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </label>
      <input className="button" type="submit" value="Execute Buy" />
    </form>
  } else {
    purchaseForm = <> </>
  }

    return (
        <div>
            <p> {props.company}</p>
            <p> {props.price} </p>

            {followButton}
            {purchaseForm}
        </div>
    );
};

export default ShareTile;

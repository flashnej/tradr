import React, { useState } from "react";

const ShareTile = (props) => {

  let followButton = <> </>;
  if (props.price) {
    followButton = <form onSubmit={props.follow}>
      <input className="button" type="submit" value= "Follow" />
    </form>
  } else {
    followButton = <> </>
  }

  let purchaseForm = <> </>;
  if (props.price) {
    purchaseForm = <form onSubmit={props.buy}>
    <label>Quantity: 
      <select className="buyQuantity" id="quantity" value={props.quantity} onChange={props.handleChange}>
        <option value=""></option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
      </select>
    </label>
    <input className="button buy" type="submit" value="Execute Buy" />
    </form>
  } else {
    purchaseForm = <> </>
  }

    return (
        <div>
          <div className="returnCompany">
            <p> {props.company}</p>
            <p> {props.price} </p>
          </div>
          {followButton}
          {purchaseForm}
        </div>
    );
};

export default ShareTile;

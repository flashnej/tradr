import React from "react";

const ShareTile = (props) => {

  let followButton = <> </>;
  if (props.price) {
    followButton = <form onSubmit={props.follow}>
      <input className="button" type="submit" value="Follow Company" />
    </form>
  } else {
    followButton = <> </>
  }

    return (
        <div>
            <p> {props.company}</p>
            <p> {props.price} </p>

            {followButton}
        </div>
    );
};

export default ShareTile;

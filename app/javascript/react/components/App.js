import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";

import SearchStockContainer from "../containers/SearchStockContainer";
import TradeContainer from "../containers/TradeContainer"
import FollowContainer from "../containers/FollowContainer"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={TradeContainer} />
        <Route exact path="/search" component={SearchStockContainer} />
        <Route exact path="/trade" component={TradeContainer} />
        <Route exact path="/follow" component={FollowContainer} />
      </Switch>
    </BrowserRouter>
  );
}

export default App

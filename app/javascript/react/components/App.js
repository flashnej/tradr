import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";

import SearchStockContainer from "../containers/SearchStockContainer";
import FollowingContainer from "../containers/FollowingContainer"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={FollowingContainer} />
        <Route exact path="/search" component={SearchStockContainer} />
      </Switch>
    </BrowserRouter>
  );
}

export default App

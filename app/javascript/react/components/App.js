import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";

import SearchStockContainer from "../containers/SearchStockContainer";

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SearchStockContainer} />
      </Switch>
    </BrowserRouter>
  );
}

export default App

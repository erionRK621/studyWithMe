// General Importation
import React from "react";
import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { apis } from "./lib/axios";

// Components Importation


function App() {
  return (
    <div>
      <ConnectedRouter history={history}>
        <Route path="/login" exact component={Login} />
      </ConnectedRouter>
    </div>

  );
}

export default App;
// General
import React from "react";
import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { apis } from "./lib/axios";

import { history } from "./redux/configStore";

// Components
import Main from "./pages/Main";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
      </ConnectedRouter>
    </div>

  );
}

export default App;
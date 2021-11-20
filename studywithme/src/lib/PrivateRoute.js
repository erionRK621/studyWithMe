import React from 'react';
import isLogin from "../lib/isLogin";
import { Route, Redirect} from "react-router";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => (isLogin() ? <Component {...props} /> : <Redirect to="/login" />)}
      />
    );
  };
  
  export default PrivateRoute;
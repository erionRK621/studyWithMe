import React from 'react';
import isLogin from "../lib/isLogin";
import { Route, Redirect} from "react-router";

const PublicRoute = ({component:Component,restricted, ...rest}) => {
    console.log(isLogin());
    return(
        <Route
      {...rest}
      render={(props) => (isLogin() && restricted ? <Redirect to="/" /> : <Component {...props} />)}
    />
    );
};

export default PublicRoute;
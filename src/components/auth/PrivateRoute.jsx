/* eslint-disable no-unused-vars */
// Native modules import
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

// Personal modules import
import { isLoggedIn } from "../../logic/auth/index";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/signin", state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;

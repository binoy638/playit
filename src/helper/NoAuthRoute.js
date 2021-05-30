import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function NoAuthRoute({ component: Component, ...rest }) {
  const { authenticated } = useSelector((state) => state.auth);
  return (
    <Route
      render={(props) => {
        if (authenticated) {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
}

export default NoAuthRoute;

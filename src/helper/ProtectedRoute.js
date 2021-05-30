import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {
  const { authenticated } = useSelector((state) => state.auth);
  return (
    <Route
      render={(props) => {
        if (authenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;

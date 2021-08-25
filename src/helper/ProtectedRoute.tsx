import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import Unauthorized from "../components/extra/Unauthorized";

function ProtectedRoute({ component: Component, path, ...rest }) {
  const { authenticated } = useSelector((state) => state.user);
  return (
    <Route
      path={path}
      render={(props) => {
        if (authenticated) {
          return <Component {...props} {...rest} />;
        } else {
          return <Unauthorized />;
        }
      }}
    />
  );
}

export default ProtectedRoute;

import { Route } from "react-router-dom";
import Unauthorized from "../components/extra/Unauthorized";
import { useTypedSelector } from "../hooks/useTypedSelector";

function ProtectedRoute({ component: Component, path, ...rest }: any) {
  const { authenticated } = useTypedSelector((state) => state.user);
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

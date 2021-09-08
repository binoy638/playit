import { useEffect } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { setShowAuthType } from "../../state/slices/user.slice";

const Unauthorized = () => {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(setShowAuthType("login"));
  }, [dispatch]);
  return (
    <div>
      <h1>You must be logged in to view this page.</h1>
    </div>
  );
};

export default Unauthorized;

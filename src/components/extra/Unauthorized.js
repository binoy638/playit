import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowAuth } from "../../actions";

const Unauthorized = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setShowAuth("login"));
  }, []);
  return (
    <div>
      <h1>You must be logged in to view this page.</h1>
    </div>
  );
};

export default Unauthorized;

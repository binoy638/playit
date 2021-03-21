import React from "react";

function Error({ message }) {
  return (
    <div className="error">
      <h1>{message}</h1>
    </div>
  );
}

export default Error;

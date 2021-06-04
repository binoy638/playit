import React from "react";
import { useHistory } from "react-router";

function CreateRoom({ ID }) {
  const history = useHistory();
  const enterRoomHandler = () => {
    history.push(`/room/${ID}`);
  };

  return (
    <div>
      <p>Your room ID is {ID}.</p>
      <button onClick={enterRoomHandler}>Enter Room</button>
    </div>
  );
}

export default CreateRoom;

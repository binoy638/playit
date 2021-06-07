import React, { useState } from "react";
import { useHistory } from "react-router";

function JoinRoom() {
  const [id, setID] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const joinRoomHandler = () => {
    if (!id) return setError("Please enter the room ID.");
    history.push(`/room/${id}`);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter the room ID"
        onChange={(e) => setID(e.target.value)}
      />
      {error && (
        <p>
          <small>{error}</small>
        </p>
      )}
      <button onClick={joinRoomHandler}>Join Room</button>
    </div>
  );
}

export default JoinRoom;

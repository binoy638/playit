import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setConnected, setCurrentTrack, setSocket } from "../actions";
import { baseURL as ENDPOINT } from "../api/config";
import { io } from "socket.io-client";

let socket;

function Room() {
  const { id } = useParams();

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("join-room", id);
  }, []);

  return <div>room id {id}</div>;
}

export default Room;

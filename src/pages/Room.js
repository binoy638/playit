import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setConnected, setCurrentTrack, setSocket } from "../actions";
import { baseURL as ENDPOINT } from "../api/config";
import { io } from "socket.io-client";

let connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

// let socket;

function Room() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { socket } = useSelector((state) => state.room);

  const [messageList, setMessageList] = useState([]);

  const [message, setMessage] = useState();

  const socketConnectionHandler = () => {
    const conn = io(ENDPOINT);
    conn.emit("join-room", id);
    addSocketEvents(conn);
    dispatch(setSocket(conn));
  };

  const addSocketEvents = (socket) => {
    socket.on("ReceiveMessage", (msgObj) => {
      msgObj.self = false;
      setMessageList((oldMsg) => [...oldMsg, msgObj]);
    });
  };

  const socketDisconnectHandler = () => {
    socket.disconnect();
    dispatch(setSocket(null));
  };

  const sendMessageHandler = () => {
    const msgObj = { message, user: user.username, image: user.image.url };
    socket.emit("MessageSent", msgObj);
    msgObj.self = true;
    setMessageList((oldMsg) => [...oldMsg, msgObj]);
    setMessage("");
  };

  if (socket)
    return (
      <div>
        <div>
          You are connected to {id} {id}
        </div>
        <button onClick={socketDisconnectHandler}>Disconnnect</button>
        <div className="chat-box">
          {messageList &&
            messageList.map((msg, index) => (
              <div
                className={msg.self ? "message self-msg" : "message"}
                key={index}
              >
                <img src={msg.image} alt="proimg" />
                <p>{msg.message}</p>
              </div>
            ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessageHandler}>send</button>
      </div>
    );
  else
    return (
      <div>
        <div>Do you want to connect to room {id} ?</div>
        <button onClick={socketConnectionHandler}>Yes</button>
      </div>
    );
}

export default Room;

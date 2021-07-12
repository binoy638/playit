import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setConnected, setCurrentTrack, setSocket } from "../actions";
import { baseURL as ENDPOINT } from "../api/config";
import { io } from "socket.io-client";

// let socket;

function Room() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { socket: Socket } = useSelector((state) => state.room);

  const [messageList, setMessageList] = useState([]);

  const [message, setMessage] = useState();

  const socketConnectionHandler = () => {
    const socket = io(ENDPOINT, { autoConnect: false });

    socket.auth = { username: user.username };
    socket.connect();
    socket.emit("join-room", id);

    socket.onAny((event, ...args) => {
      console.log("inside");
      console.log(event, args);
    });
    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        return;
      }
    });
    addSocketEvents(socket);
    dispatch(setSocket(socket));
  };

  const addSocketEvents = (socket) => {
    socket.on("ReceiveMessage", (msgObj) => {
      msgObj.self = false;
      setMessageList((oldMsg) => [...oldMsg, msgObj]);
    });
  };

  const socketDisconnectHandler = () => {
    Socket.disconnect();
    dispatch(setSocket(null));
  };

  const sendMessageHandler = () => {
    const msgObj = { message, user: user.username, image: user.image.url };
    Socket.emit("MessageSent", msgObj);
    msgObj.self = true;
    setMessageList((oldMsg) => [...oldMsg, msgObj]);
    setMessage("");
  };

  if (Socket)
    return (
      <div>
        <div>You are connected to {id}</div>
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
        <button onClick={sendMessageHandler}>send</button> <br></br>
        <button onClick={() => {}}>Sync Player</button>
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

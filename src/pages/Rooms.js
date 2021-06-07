import React, { useEffect, useState } from "react";

import CreateRoom from "../components/room/CreateRoom";
import { nanoid } from "nanoid";
import JoinRoom from "../components/room/JoinRoom";
import PageHeader from "../components/extra/PageHeader";

// function Room() {
// const [messageList, setMessageList] = useState([]);

// const [message, setMessage] = useState({ user: "Anonymous", content: "" });

//   const { current, isPlaying, duration, currentTime, ref } = useSelector(
//     (state) => state.player
//   );

//   useEffect(() => {
//     console.log(ref);
//   }, [ref]);

//   const dispatch = useDispatch();

//   // useEffect(() => {
//   // console.log(currentTime);
//   // }, [currentTime]);

//   //TODO:remove the event listers
//   useEffect(() => {
//     socket = io(ENDPOINT);
//     dispatch(setConnected(true));
//     dispatch(setSocket(socket));
//     socket.on("ReceiveMessage", (data) => {
//       setMessageList((oldMsg) => [...oldMsg, data]);
//     });
//     socket.on("ReceiveSync", (currentTrack) => {
//       dispatch(setCurrentTrack(currentTrack));
//     });
//   }, []);

//   // useEffect(() => {
//   //   console.log("from socket useEffect", ref);

//   //   socket.on("ReceiveSeek", (time) => ref.current.internalPlayer.seekTo(time));
//   // }, [ref]);

//   const syncHandler = () => {
//     socket.emit("SyncPlayer", current);
//   };

//   const sendMessageHandler = () => {
//     setMessageList((oldMsg) => [...oldMsg, message]);
//     socket.emit("MessageSent", message);
//   };

//   return (
//     <div className="room">
//       <div className="msgDisplay">
//         {messageList.length &&
//           messageList.map((msg, index) => {
//             return (
//               <div key={index}>
//                 <h4>
//                   {msg.user} : {msg.content}
//                 </h4>
//               </div>
//             );
//           })}
//       </div>
//       <input
//         className="msg-input"
//         onChange={(e) => setMessage({ ...message, content: e.target.value })}
//       />
//       <button className="msg-button" onClick={sendMessageHandler}>
//         send
//       </button>
//       <br></br>
//       <button onClick={syncHandler}>Sync</button>
//       <button
//         onClick={() => {
//           // console.log(ref.target);
//           ref.target.seekTo(30);
//         }}
//       >
//         Test
//       </button>
//     </div>
//   );
// }

function Rooms() {
  const [choice, setChoice] = useState(0);

  if (!choice)
    return (
      <div>
        <PageHeader heading={"Rooms"} />
        <div className="prompt">
          <div className="container">
            <div className="choice" onClick={() => setChoice(1)}>
              Create a Room
            </div>
            <div className="choice" onClick={() => setChoice(2)}>
              Join a Room
            </div>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div>
        <PageHeader heading={"Rooms"} />
        <div className="prompt">
          <div className="container">
            {choice === 1 ? <CreateRoom ID={nanoid(10)} /> : <JoinRoom />}
          </div>
        </div>
      </div>
    );
}

export default Rooms;

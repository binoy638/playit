import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriendStatus } from "../actions";

const useSocket = () => {
  const dispatch = useDispatch();

  const { socket } = useSelector((state) => state.user);
  useEffect(() => {
    if (socket) {
      socket.on("FriendOnline", (friendID) => {
        dispatch(setFriendStatus(friendID, 1));
      });
      socket.on("FriendOffline", (friendID) => {
        dispatch(setFriendStatus(friendID, 0));
      });

      socket.on("SetOnlineFriends", (friendList) => {
        console.log("inside set online friends");
        console.log(friendList);
        if (friendList.length) {
          friendList.forEach((friend) => {
            dispatch(setFriendStatus(friend, 1));
          });
        }
      });

      var timer = setTimeout(() => {
        socket.emit("fetchOnlineFriends");
      }, 1000);
    }

    return () => {
      if (socket) {
        socket.off("FriendOnline");
        socket.off("FriendOfflin");
        socket.off("SetOnlineFriends");
        clearTimeout(timer);
      }
    };
  }, [socket, dispatch]);

  return socket;
};

export default useSocket;

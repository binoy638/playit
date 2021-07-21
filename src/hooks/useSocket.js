import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentTrack,
  setFriendStatus,
  setisPlaying,
  setSeekTime,
} from "../actions";
import { SET_PLAYER_SYNCEDTO, SET_PLAYER_SYNCEDWITH } from "../actions/types";

const useSocket = () => {
  const dispatch = useDispatch();

  const { syncedWith } = useSelector((state) => state.player);

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
        if (friendList.length) {
          friendList.forEach((friend) => {
            dispatch(setFriendStatus(friend, 1));
          });
        }
      });

      socket.on("Sync:user-offline", (username) => {
        //TODO: Display this in UI
        console.log(username + " is offline");
      });

      socket.on("Sync:connected-to", () => {
        console.log("user synced to your player");
        dispatch({
          type: SET_PLAYER_SYNCEDTO,
          payload: true,
        });
      });

      socket.on("Sync:connected-with", (id) => {
        console.log("you are sync with ", id);
        dispatch({
          type: SET_PLAYER_SYNCEDWITH,
          payload: id,
        });
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

  useEffect(() => {
    if (socket && syncedWith) {
      socket.on("Sync:player-track", (track) => {
        console.log("Syncing player track");
        dispatch(setCurrentTrack(track));
      });
      socket.on("Sync:player-slider", (time) => {
        console.log("Syncing player slider");
        dispatch(setSeekTime(time));
      });
      socket.on("Sync:player-state", (bool) => {
        console.log("Syncing player state");
        dispatch(setisPlaying(bool));
      });
    }

    return () => {
      if (socket) {
        socket.off("Sync:player-track");
        socket.off("Sync:player-slider");
        socket.off("Sync:player-state");
      }
    };
  }, [socket, syncedWith, dispatch]);

  return socket;
};

export default useSocket;

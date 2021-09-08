import { useEffect } from "react";
import {
  setIsPlaying,
  setSeekTime,
  setSyncedTo,
  setSyncedWith,
} from "../state/slices/player.slice";
import { setFriendStatus } from "../state/slices/user.slice";
import { setCurrentTrack } from "../state/thunks/currrentTrack.thunk";
import { IFriendUser, ITrack } from "../state/types";
import { useTypedDispatch } from "./useTypedDispatch";
import { useTypedSelector } from "./useTypedSelector";

const useSocket = () => {
  const dispatch = useTypedDispatch();

  const { syncedWith } = useTypedSelector((state) => state.player);

  const { socket } = useTypedSelector((state) => state.user);
  useEffect(() => {
    if (socket) {
      socket.on("FriendOnline", (friendUserID: string) => {
        dispatch(setFriendStatus({ friendUserID, status: 1 }));
      });
      socket.on("FriendOffline", (friendUserID: string) => {
        dispatch(setFriendStatus({ friendUserID, status: 0 }));
      });

      socket.on("SetOnlineFriends", (friendList: IFriendUser[]) => {
        if (friendList.length) {
          friendList.forEach((friend: IFriendUser) => {
            dispatch(setFriendStatus({ friendUserID: friend._id, status: 1 }));
          });
        }
      });

      socket.on("Sync:user-offline", (username: string) => {
        //TODO: Display this in UI
        console.log(username + " is offline");
      });

      socket.on("Sync:connected-to", () => {
        console.log("user synced to your player");
        dispatch(setSyncedTo(true));
      });

      socket.on("Sync:connected-with", (id: string) => {
        console.log("you are sync with ", id);
        dispatch(setSyncedWith(id));
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
      socket.on("Sync:player-track", (track: ITrack) => {
        console.log("Syncing player track");
        dispatch(setCurrentTrack(track));
      });
      socket.on("Sync:player-slider", (time: number) => {
        console.log("Syncing player slider");
        dispatch(setSeekTime(time));
      });
      socket.on("Sync:player-state", (bool: boolean) => {
        console.log("Syncing player state");
        dispatch(setIsPlaying(bool));
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

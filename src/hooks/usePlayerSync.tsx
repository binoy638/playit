import { useEffect } from "react";
import { useTypedSelector } from "./useTypedSelector";

const usePlayerSync = () => {
  const { user, socket } = useTypedSelector((state) => state.user);
  const { current, isPlaying, syncedTo, seekTime } = useTypedSelector(
    (state) => state.player
  );

  useEffect(() => {
    if (syncedTo && socket && current) {
      if (user) socket.emit("Sync:player-track", current, user._id);
    }
  }, [syncedTo, socket, current, user]);

  useEffect(() => {
    if (syncedTo && socket && seekTime) {
      if (user) socket.emit("Sync:player-slider", seekTime, user._id);
    }
  }, [syncedTo, socket, seekTime, user]);

  useEffect(() => {
    if (syncedTo && socket) {
      if (user) socket.emit("Sync:player-state", isPlaying, user._id);
    }
  }, [syncedTo, socket, isPlaying, user]);
};

export default usePlayerSync;

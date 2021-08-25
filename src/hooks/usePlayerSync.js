import { useSelector } from "react-redux";
import { useEffect } from "react";

const usePlayerSync = () => {
  const { user, socket, authenticated } = useSelector((state) => state.user);
  const { current, isPlaying, syncedTo, seekTime } = useSelector(
    (state) => state.player
  );

  useEffect(() => {
    if (!authenticated) return;

    if (syncedTo && socket && current) {
      socket.emit("Sync:player-track", current, user._id);
    }
  }, [syncedTo, socket, current, user?._id, authenticated]);

  useEffect(() => {
    if (!authenticated) return;
    if (syncedTo && socket && seekTime) {
      socket.emit("Sync:player-slider", seekTime, user._id);
    }
  }, [syncedTo, socket, seekTime, user?._id, authenticated]);

  useEffect(() => {
    if (!authenticated) return;
    if (syncedTo && socket) {
      socket.emit("Sync:player-state", isPlaying, user._id);
    }
  }, [syncedTo, socket, isPlaying, user?._id, authenticated]);
};

export default usePlayerSync;

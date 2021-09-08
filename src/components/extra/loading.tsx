import React from "react";
import { motion } from "framer-motion";

export const Loading = () => {
  return (
    <div className="loading">
      <motion.div
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          transition: {
            duration: 3,
            repeat: Infinity,
          },
        }}
        className="circle"
      />
      <motion.div
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 270, 0, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          transition: {
            duration: 3,
            repeat: Infinity,
          },
        }}
        className="circle"
      />
      <motion.div
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [270, 0, 0, 0, 270],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          transition: {
            duration: 3,
            repeat: Infinity,
          },
        }}
        className="circle"
      />
    </div>
  );
};

export const TrackLoading = () => {
  return (
    <div className="tracks-loading">
      <motion.div
        animate={{
          rotate: 360,
          transition: {
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          },
        }}
        className="loading-circle"
      />
    </div>
  );
};

interface PlayerLoadingProps {
  widthPercent: number;
  transitionDuration: number;
}

export const PlayerLoading = ({
  widthPercent,
  transitionDuration,
}: PlayerLoadingProps) => {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${widthPercent}%` }}
      transition={{ duration: transitionDuration }}
      className="player-loading"
    ></motion.div>
  );
};

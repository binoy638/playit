import React from "react";
import { motion } from "framer-motion";

function Loading() {
  return (
    <div className="loading">
      <motion.div
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          transition: {
            duration: 3,
            yoyo: Infinity,
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
            yoyo: 10,
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
            yoyo: 10,
          },
        }}
        className="circle"
      />
    </div>
  );
}

export default Loading;

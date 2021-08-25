import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHight, setWindowHight] = useState(window.innerHeight);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setWindowHight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return [windowWidth, windowHight];
};

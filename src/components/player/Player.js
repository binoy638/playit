import React, { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import {
  Previous,
  Play,
  Next,
  Volume,
  OutlineHeart,
  Loop,
  ArrowUp,
  Pause,
} from "../../helper/svg";

const opts = {
  height: "0",
  width: "0",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};

function Player({ videoid, currentTrack, setvideoid }) {
  const [isPlaying, setisPlaying] = useState(false);
  const [currentTime, setcurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/videoid?query=${currentTrack.search_query}`)
      .then((response) => {
        resetPlayer();
        setvideoid(response.data.id);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  const resetPlayer = () => {
    playerRef.current.resetPlayer();
    setcurrentTime(0);
  };

  useEffect(() => {
    let id;
    if (isPlaying === true) {
      id = setInterval(async () => {
        const t = await playerRef.current.internalPlayer.getCurrentTime();
        setcurrentTime(t);
      }, 1000);
    }

    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [isPlaying]);
  const isplayinghandler = () => {
    if (isPlaying) {
      playerRef.current.internalPlayer.pauseVideo();
    } else {
      playerRef.current.internalPlayer.playVideo();
    }
  };
  const _onReady = (event) => {
    const c = event.target.getDuration();
    setDuration(c);
    if (isPlaying) {
      playerRef.current.internalPlayer.playVideo();
    } else {
      playerRef.current.internalPlayer.pauseVideo();
    }
  };
  const playerStateHandler = (e) => {
    // -1 (unstarted)   0 (ended)    1 (playing)    2 (paused)   3 (buffering)    (video cued)
    if (e.data === 0 || e.data === 2) {
      setisPlaying(false);
    } else if (e.data === 1 || e.data === 3) {
      setisPlaying(true);
    }
  };

  const seekHandler = (e) => {
    let time = e.target.value;
    playerRef.current.internalPlayer.seekTo(time);
    setcurrentTime(time);
  };
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  return (
    <section className="player">
      <YouTube
        videoId={videoid}
        opts={opts}
        onReady={_onReady}
        onStateChange={(e) => playerStateHandler(e)}
        onEnd={resetPlayer}
        ref={playerRef}
      />
      <div className="current-song-info">
        <img src={currentTrack.image} alt="" />
        <div>
          <p className="song-name">{currentTrack.title}</p>
          <p className="song-artist">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="music-controller">
        <div className="play-fo-back-controller">
          <Previous />
          {isPlaying ? (
            <Pause clickFunction={isplayinghandler} />
          ) : (
            <Play clickFunction={isplayinghandler} />
          )}

          <Next />
        </div>

        <div className="main-controller">
          <p className="time-elapsed">
            {currentTime ? getTime(currentTime) : "0:00"}
          </p>
          <div className="slider-container">
            <input
              type="range"
              min={0}
              max={Math.ceil(duration)}
              onChange={seekHandler}
              value={Math.ceil(currentTime)}
              className="slider"
              id="myRange"
            />
          </div>
          <p className="total-duration">
            {duration ? getTime(duration) : "0:00"}
          </p>
        </div>

        <div className="interactivity">
          <Volume />
          <OutlineHeart />
          <Loop />
          <div className="other-options">...</div>
        </div>
      </div>

      <ArrowUp />
    </section>
  );
}

export default Player;

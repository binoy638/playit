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
import { useContext } from "react";
import { AppContext } from "../../App";

const opts = {
  height: "0",
  width: "0",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};

// const BASE_URL =  "http://localhost:5000/"
const BASE_URL = "https://playit-server.herokuapp.com/";

function Player() {
  const { videoid, currentTrack, setvideoid } = useContext(AppContext);

  const [isPlaying, setisPlaying] = useState(false);

  const [currentTime, setcurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);

  const playerRef = useRef(null);

  //hook to fetch youtube video id
  useEffect(() => {
    axios
      .get(`${BASE_URL}videoid?query=${currentTrack.search_query}`)
      .then((response) => {
        resetPlayer();
        setvideoid(response.data.id);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]); //this hook runs only when the current track changes

  const resetPlayer = () => {
    playerRef.current.resetPlayer();
    setcurrentTime(0);
  };

  //hook to make the player silder move
  useEffect(() => {
    let id;
    if (isPlaying === true) {
      playerRef.current.internalPlayer.playVideo();
      id = setInterval(async () => {
        const t = await playerRef.current.internalPlayer.getCurrentTime();
        setcurrentTime(t);
      }, 1000);
    } else {
      playerRef.current.internalPlayer.pauseVideo();
    }

    //cleanup function to clear previous setInverval before starting a new one
    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [isPlaying]); //this hook runs only when the track is paused or resume

  const isplayinghandler = () => {
    setisPlaying(!isPlaying);
  };

  //this function runs the the youtube iframe is ready
  const _onReady = (event) => {
    const c = event.target.getDuration();
    setDuration(c);
    if (isPlaying) {
      playerRef.current.internalPlayer.playVideo();
    } else {
      playerRef.current.internalPlayer.pauseVideo();
    }
  };

  //function to see if the video is playing or not and set our isPlaying state accordingly
  const playerStateHandler = (e) => {
    // -1 (unstarted)   0 (ended)    1 (playing)    2 (paused)   3 (buffering)    (video cued)
    if (e.data === 0 || e.data === 2) {
      setisPlaying(false);
    } else if (e.data === 1 || e.data === 3) {
      setisPlaying(true);
    }
  };

  //function to make the slider work
  const seekHandler = (e) => {
    let time = e.target.value;
    playerRef.current.internalPlayer.seekTo(time);
    setcurrentTime(time);
  };

  //function to format time in seconds to this 0:00
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

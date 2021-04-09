import React, { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";
import {
  Previous,
  Play,
  Next,
  Volume,
  OutlineHeart,
  Loop,
  ArrowUp,
  Pause,
  Mute,
} from "../../helper/svg";

import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { PlayerLoading } from "../extra/loading";
import { HIDE_TRACK_LOADING } from "../../actions/types";
import {
  nextTrack,
  previousTrack,
  setCurrentTrack,
  setLoop,
  setVideoID,
} from "../../actions";
import { useFirstRender } from "../../hooks/useFirstRender";

const opts = {
  height: "0",
  width: "0",
  playerVars: {
    autoplay: 1,
  },
};

function Player() {
  const { title, artist, image, videoid } = useSelector(
    (state) => state.currentTrack
  );

  const { TrackLoading } = useSelector((state) => state.loading);

  const { current, loop } = useSelector((state) => state.player);

  const dispatch = useDispatch();

  const [volume, setVolume] = useState();

  const [showVolControl, setShowVolControl] = useState(false);

  const [isPlaying, setisPlaying] = useState(false);

  const [currentTime, setcurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);

  const onReadyPlayerRef = useRef(null);

  const firstRender = useFirstRender();

  const playerRef = useRef(null);

  const [isMuted, setIsMuted] = useState(false);

  const onErrorRef = useRef(null);

  useEffect(() => {
    if (!firstRender) {
      setPlayerTrack();
    }
  }, [current]);

  const setPlayerTrack = () => {
    setcurrentTime(0);
    setDuration(0);
    dispatch(setCurrentTrack(current));
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

  useEffect(() => {
    if (volume <= 1) {
      setIsMuted(true);
      playerRef.current.internalPlayer.mute();
    } else {
      setIsMuted(false);
      playerRef.current.internalPlayer.unMute();
    }
  }, [volume]);

  const isplayinghandler = () => {
    setisPlaying(!isPlaying);
  };

  //this function runs the the youtube iframe is ready
  const _onReady = (event) => {
    setVolume(event.target.getVolume());
    setIsMuted(event.target.isMuted());
    const duration = event.target.getDuration();
    setDuration(duration);
    onReadyPlayerRef.current = event.target;
    setisPlaying(true);
  };

  //function to see if the video is playing or not and set our isPlaying state accordingly
  const playerStateHandler = (e) => {
    // -1 (unstarted)   0 (ended)    1 (playing)    2 (paused)   3 (buffering)    5 (video cued)
    if (e.data === 1 || e.data === -1) {
      dispatch({ type: HIDE_TRACK_LOADING });
    }
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

  const onEnd = () => {
    dispatch(nextTrack());
  };

  const onPlay = () => {
    setTimeout(() => {
      const duration = onReadyPlayerRef.current.getDuration();
      setDuration(duration);
    }, 500);
    if (onErrorRef.current) {
      onErrorRef.current = null;
    }
  };

  const volumeControlHandler = (e) => {
    setVolume(e.target.value);
    playerRef.current.internalPlayer.setVolume(volume);
  };

  const onError = (e) => {
    if (e.data === 150) {
      if (onErrorRef.current) {
        dispatch(nextTrack());
      } else {
        onErrorRef.current = current.id;
        dispatch(setVideoID(current.search_query));
      }
    }
  };
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          ease: "easeOut",
          duration: 1,
        },
      }}
      className="player"
    >
      {TrackLoading ? (
        <PlayerLoading widthPercent={100} transitionDuration={2} />
      ) : (
        ""
      )}

      {videoid ? (
        <YouTube
          videoId={videoid}
          opts={opts}
          onReady={_onReady}
          onStateChange={playerStateHandler}
          onEnd={onEnd}
          onPlay={onPlay}
          onError={onError}
          ref={playerRef}
        />
      ) : (
        ""
      )}

      <div className="current-song-info">
        <img src={image} alt="" />
        <div>
          <p className="song-name">{title}</p>
          <p className="song-artist">{artist}</p>
        </div>
      </div>

      <div className="music-controller">
        <div className="play-fo-back-controller">
          <Previous clickFunction={() => dispatch(previousTrack())} />
          {isPlaying ? (
            <Pause clickFunction={isplayinghandler} />
          ) : (
            <Play clickFunction={isplayinghandler} />
          )}

          <Next
            clickFunction={() => {
              dispatch(nextTrack());
            }}
          />
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
            />
          </div>
          <p className="total-duration">
            {duration ? getTime(duration) : "0:00"}
          </p>
        </div>

        <div className="interactivity">
          <div className="volume-control">
            {isMuted ? (
              <Mute
                clickFunction={() => {
                  setShowVolControl(!showVolControl);
                }}
              />
            ) : (
              <Volume
                clickFunction={() => {
                  setShowVolControl(!showVolControl);
                }}
              />
            )}

            {showVolControl && (
              <input
                type="range"
                min={0}
                max={100}
                onChange={(e) => volumeControlHandler(e)}
                value={volume}
                className="volume-slider"
              />
            )}
          </div>

          <OutlineHeart />
          <Loop
            clickFunction={() => {
              dispatch(setLoop(!loop));
            }}
            isLoopActive={loop}
          />
          <div className="other-options">...</div>
        </div>
      </div>

      <ArrowUp />
    </motion.section>
  );
}

export default Player;

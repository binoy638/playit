import { useState, useRef, useEffect, ChangeEvent } from "react";
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
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { PlayerLoading } from "../extra/loading";
import { useFirstRender } from "../../hooks/useFirstRender";
import usePlayerSync from "../../hooks/usePlayerSync";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import {
  setCurrentTime,
  setDuration,
  setIsPlaying,
  setLoop,
  setNextTrack,
  setPreviousTrack,
  setSeekTime,
  setLoading,
} from "../../state/slices/player.slice";
import {
  changeVideoId,
  setCurrentTrack,
} from "../../state/thunks/currrentTrack.thunk";

// const opts = {
//   height: "0",
//   width: "0",
//   playerVars: {
//     autoplay: 1,
//   },
// };

function Player() {
  const { title, artist, image, videoid } = useTypedSelector(
    (state) => state.currentTrack
  );

  const {
    current,
    loop,
    currentTime,
    isPlaying,
    duration,
    seekTime,
    syncedWith,
    loading,
  } = useTypedSelector((state) => state.player);

  usePlayerSync();

  const dispatch = useTypedDispatch();

  const [volume, setVolume] = useState(100);

  const [showVolControl, setShowVolControl] = useState(false);

  const [sliderPercentage, setSliderPercentage] = useState(0);

  const onReadyPlayerRef = useRef<any>(null);

  const firstRender = useFirstRender();

  const playerRef = useRef<any>();

  const [isMuted, setIsMuted] = useState(false);

  const onErrorRef = useRef<any>(null);

  useEffect(() => {
    if (!firstRender) {
      setPlayerTrack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const setPlayerTrack = () => {
    dispatch(setCurrentTime(0));
    dispatch(setDuration(0));
    setSliderPercentage(0);
    if (current) {
      dispatch(setCurrentTrack(current));
    }
  };

  useEffect(() => {
    if (syncedWith) {
      playerRef.current.internalPlayer.seekTo(seekTime);
    }
  }, [seekTime, syncedWith]);

  //hook to make the player silder move
  useEffect(() => {
    let id: ReturnType<typeof setInterval>;
    if (isPlaying === true) {
      playerRef.current.internalPlayer.playVideo();
      id = setInterval(async () => {
        const t = await playerRef.current.internalPlayer.getCurrentTime();
        dispatch(setCurrentTime(t));
      }, 500);
    } else {
      playerRef.current.internalPlayer.pauseVideo();
    }
    //cleanup function to clear previous setInverval before starting a new one
    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [isPlaying, dispatch]); //this hook runs only when the track is paused or resume

  useEffect(() => {
    if (duration) {
      setSliderPercentage((currentTime / duration) * 100);
      dispatch(setCurrentTime(currentTime));
    }
  }, [currentTime, duration, dispatch]);

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
    dispatch(setIsPlaying(!isPlaying));
  };

  //this function runs the the youtube iframe is ready
  const _onReady = (event: any) => {
    setVolume(event.target.getVolume());
    setIsMuted(event.target.isMuted());
    const duration = event.target.getDuration();
    dispatch(setDuration(duration));
    onReadyPlayerRef.current = event.target;
    dispatch(setIsPlaying(true));
  };

  //function to see if the video is playing or not and set our isPlaying state accordingly
  const playerStateHandler = (e: any) => {
    // -1 (unstarted)   0 (ended)    1 (playing)    2 (paused)   3 (buffering)    5 (video cued)
    if (e.data === 1 || e.data === -1) {
      dispatch(setLoading(false));
    }
    if (e.data === 0 || e.data === 2) {
      dispatch(setIsPlaying(false));
    } else if (e.data === 1 || e.data === 3) {
      dispatch(setIsPlaying(true));
    }
  };

  //function to make the slider work
  const seekHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let time = e.target.value;
    playerRef.current.internalPlayer.seekTo(time);
    dispatch(setCurrentTime(Number(time)));
    dispatch(setSeekTime(Number(time)));
  };

  //function to format time in seconds to this 0:00
  const getTime = (time: number) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const onEnd = () => {
    dispatch(setNextTrack());
  };

  const onPlay = () => {
    setTimeout(() => {
      const duration = onReadyPlayerRef?.current?.getDuration();
      dispatch(setDuration(duration));
    }, 500);
    if (onErrorRef.current) {
      onErrorRef.current = null;
    }
  };

  const volumeControlHandler = (e: any) => {
    setVolume(e.target.value);
    playerRef.current.internalPlayer.setVolume(volume);
  };

  const onError = (e: any) => {
    if (e.data === 150) {
      if (onErrorRef.current) {
        dispatch(setNextTrack());
      } else {
        if (current) {
          onErrorRef.current = current.id;
          dispatch(changeVideoId(current.search_query));
        }
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
      {loading ? (
        <PlayerLoading widthPercent={100} transitionDuration={2} />
      ) : (
        ""
      )}

      {videoid ? (
        <YouTube
          videoId={videoid}
          opts={{
            height: "0",
            width: "0",
            playerVars: {
              autoplay: 1,
            },
          }}
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
          <Previous clickFunction={() => dispatch(setPreviousTrack())} />
          {isPlaying ? (
            <Pause clickFunction={isplayinghandler} />
          ) : (
            <Play clickFunction={isplayinghandler} />
          )}

          <Next
            clickFunction={() => {
              dispatch(setNextTrack());
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
            <motion.div
              className="animate-track"
              animate={{ x: `${sliderPercentage ? sliderPercentage : 0}%` }}
            ></motion.div>
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

            <AnimatePresence>
              {showVolControl && (
                <div className="volume-slider-container">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    onChange={(e) => volumeControlHandler(e)}
                    value={volume}
                    className="volume-slider"
                  />
                  <div
                    className="volume-slider-animation"
                    style={{ transform: `translateX(${volume}%)` }}
                  ></div>
                </div>
              )}
            </AnimatePresence>
          </div>
          {!showVolControl && <OutlineHeart />}

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

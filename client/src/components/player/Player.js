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

function Player({ videoid, setCurrentTrack, currentTrack, setvideoid }) {
  const [isPlaying, setisPlaying] = useState(false);
  const [currentTime, setcurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/videoid?query=${currentTrack.search_query}`)
      .then((response) => {
        setvideoid(response.data.id);
      });
    // return () => {
    //   cleanup
    // }
  }, []);
  //   -1 (unstarted)
  // 0 (ended)
  // 1 (playing)
  // 2 (paused)
  // 3 (buffering)
  // 5 (video cued)
  // useEffect(() => {
  //   let id;
  //   if (isPlaying === true) {
  //     id = setInterval(() => {
  //       setcurrentTime((count) => count + 1);
  //     }, 1000);
  //   }
  //   return () => {
  //     if (id) {
  //       clearInterval(id);
  //     }
  //   };
  // }, [isPlaying]);
  useEffect(() => {
    let id;
    if (isPlaying === true) {
      id = setInterval(async () => {
        const t = await playerRef.current.internalPlayer.getCurrentTime();
        setcurrentTime(Math.ceil(t));
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
    // event.target.playVideo();
    // access to player in all event handlers via event.target
    console.log(event);
    // var d = event.target.getCurrentTime();
    // console.log(d / 60);
    const c = event.target.getDuration();
    console.log(c);
    setDuration(Math.ceil(c));

    // console.log(c);
    // console.log(d);

    console.log(playerRef);

    // console.log("songduration");
    // console.log(songduration);
  };
  const playerStateHandler = (e) => {
    console.log(e.data);
    if (e.data === 0 || e.data === 2) {
      setisPlaying(false);
    } else if (e.data === 1 || e.data === 3) {
      setisPlaying(true);
      // setcurrentTime((count) => count + 1);
    }
  };

  const dragHandler = () => {
    const id = setInterval(() => {
      setcurrentTime((count) => count + 1);
    }, 1000);
    return id;
  };

  const seekHandler = (e) => {
    let time = e.target.value;
    playerRef.current.internalPlayer.seekTo(time);
    setcurrentTime(time);
  };
  const changeDuration = (e) => {
    const c = e.target.getDuration();
    // console.log(c);
    setDuration(Math.ceil(c));
  };
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  return (
    // <div className="player">

    //   <div className="play-control">
    //     {currentTime}
    //     <input
    //       min={0}
    //       max={duration}
    //       onChange={seekHandler}
    //       value={currentTime}
    //       type="range"
    //     />
    //     {duration}
    //     <button
    //       onClick={() => {
    //         isplayinghandler();
    //       }}
    //     >
    //       Play
    //     </button>
    //   </div>
    // </div>
    <section className="player">
      <YouTube
        videoId={videoid}
        opts={opts}
        // onPlayerReady={() => {
        //   console.log("ready");
        // }}
        onReady={(e) => _onReady(e)}
        // onTimeUpdate={() => console.log("hi")}
        onStateChange={(e) => playerStateHandler(e)}
        // onPlay={() => {
        //   console.log(duration);
        // }}
        onPlay={(e) => changeDuration(e)}
        // onPlaybackRateChange={(e) => console.log(e.target.value)}
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
          <p className="time-elapsed">{getTime(currentTime)}</p>
          <div className="slider-container">
            <input
              type="range"
              min={0}
              max={duration}
              onChange={seekHandler}
              value={currentTime}
              className="slider"
              id="myRange"
            />
          </div>
          <p className="total-duration">{getTime(duration)}</p>
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

class Playlist {
  constructor(tracks = [], index = 0) {
    this.tracks = tracks;
    this.current = null;
    this.currentIndex = index;
    this.totalTracks = tracks.length;
    this.loop = false;
    this.setCurrentTrack();
  }
  add(track) {
    this.tracks.push(track);
    this.totalTracks += 1;
  }
  setCurrentTrack() {
    const totalTracks = this.totalTracks;
    const currentIndex = this.currentIndex;
    if (totalTracks) {
      this.current = this.tracks[currentIndex];
    }
  }
  nextTrack() {
    if (this.currentIndex < this.totalTracks - 1) {
      this.currentIndex += 1;
      this.setCurrentTrack();
      if (this.loop && this.currentIndex === this.totalTracks - 1) {
        this.currentIndex = -1;
      }
    } else {
      if (this.loop && this.currentIndex === this.totalTracks - 1) {
        this.currentIndex = 0;
        this.setCurrentTrack();
      }
    }
  }

  previousTrack() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
      this.setCurrentTrack();
    } else {
      if (this.loop && this.currentIndex === 0) {
        this.currentIndex = this.totalTracks - 1;
        this.setCurrentTrack();
      }
    }
  }

  getCurrent() {
    return this.current;
  }

  setLoop(bool) {
    this.loop = bool;
  }
}

export default Playlist;

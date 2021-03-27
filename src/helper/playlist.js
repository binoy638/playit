class Playlist {
  constructor(tracks = [], index = 0) {
    this.tracks = tracks;
    this.current = null;
    this.next = null;
    this.previous = null;
    this.currentIndex = index;
    this.totalTracks = tracks.length;
    this.setCNP();
  }
  add(track) {
    this.tracks.push(track);
    this.totalTracks += 1;
  }
  setCNP() {
    const totalTracks = this.totalTracks;
    const currentIndex = this.currentIndex; //CNP = Current Next Previous
    if (totalTracks) {
      this.current = this.tracks[currentIndex];
      if (totalTracks - 1 > currentIndex) {
        this.next = this.tracks[currentIndex + 1];
      }
      if (currentIndex > 0) {
        this.previous = this.tracks[currentIndex - 1];
      }
    }
  }
  skipTrack() {
    if (this.currentIndex < this.totalTracks - 1) {
      this.currentIndex += 1;
      this.setCNP();
      if (this.currentIndex === this.totalTracks - 1) {
        this.next = null;
      }
      return;
    }
    this.next = null;
    return;
  }
  previousTrack() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
      this.setCNP();
      if (this.currentIndex === 0) {
        this.previous = null;
      }
      return;
    }
    this.previous = null;
    return;
  }
  getCurrent() {
    return this.current;
  }
  getNext() {
    return this.next;
  }
  getPrevious() {
    return this.previous;
  }
}

export default Playlist;

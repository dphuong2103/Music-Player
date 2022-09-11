import { SongComponent } from './components/song/song/song.component';
import { Component, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'MusicPlayer';
  isPlaying = false;
  cdThump: any;
  CDThumpAnimate: any;
  audio: any;
  currentSong: any;
  songs: SongComponent[];
  currentSongTime: number = 0;
  currentSongIndex: number = 0;
  isRepeat = false;
  constructor(@Inject(DOCUMENT) private doc: Document) {
    this.songs = this.getSongs();
    this.currentSong = this.songs[0];
  }

  ngAfterViewInit() {
    this.initiateCDThump();
    this.rotateCDThump();
    this.audio = this.doc.querySelector('.audio');
    this.audio.src = this.currentSong.url;
  }

  // used to initiate global CD disk
  initiateCDThump() {
    this.cdThump = this.doc.querySelector('.cdThump');
    this.CDThumpAnimate = this.cdThump
      ? this.cdThump.animate([{ transform: 'rotate(360deg)' }], {
          duration: 10000,
        })
      : null;
  }

  // control the rotation of CD disk
  rotateCDThump() {
    if (this.isPlaying) {
      this.CDThumpAnimate?.play();
    } else {
      this.CDThumpAnimate?.pause();
    }
  }

  // click to play song or pause
  musicControl() {
    if (this.isPlaying) {
      this.isPlaying = false;
      this.rotateCDThump();
      this.playAudio();
    } else {
      this.isPlaying = true;
      this.rotateCDThump();
      this.playAudio();
    }
  }

  getSongs(): SongComponent[] {
    let song1 = new SongComponent();
    song1.songName = 'Hello ba gia`';
    song1.singer = 'Micheal learn to rock';
    song1.url = '/assets/music/1.mp3';
    song1.imgURL =
      'https://vir.com.vn/stores/news_dataimages/hung/022014/20/09/michael-learns-to-rock.jpg';

    let song2 = new SongComponent();
    song2.singer = 'Jack';
    song2.url = '/assets/music/2.mp3';
    song2.songName = 'hello ong gia';
    song2.imgURL =
      'https://image.thanhnien.vn/w1024/Uploaded/2022/znetns/2022_04_11/jack-new-2274.jpg';

    let songs: SongComponent[] = [song1, song2];
    return songs;
  }

  playAudio() {
    if (this.isPlaying) {
      this.audio.play();
      this.onPlayingSong();
    }
    if (!this.isPlaying) {
      this.audio.pause();
    }
  }

  // Update song time when song is playing
  onPlayingSong() {
    this.audio.addEventListener('timeupdate', () => {
      // Check if this.currentSongTime return a number or not? Without checking, it will return NaN
      if ((this.audio.currentTime * 100) / this.audio.duration) {
        this.currentSongTime =
          (this.audio.currentTime * 100) / this.audio.duration;
      }
      console.log(this.currentSongTime);
      this.nextSongAutomatically();
    });
  }

  // Change song current time when select input range
  selectSongTime() {
    this.audio.currentTime = Math.round(
      (this.currentSongTime * this.audio.duration) / 100
    );
  }

  log(data: any) {
    console.log(data);
  }

  // Check whether the song is over. if over => add CurrentSongIndex +=1 and go to next song;
  nextSongAutomatically() {
    if (this.currentSongTime == 100) {
      if (!this.isRepeat) {
        if (this.currentSongIndex == this.songs.length - 1) {
          this.currentSongIndex = 0;
        } else {
          this.currentSongIndex += 1;
        }
      }
      this.setCurrentSong(this.currentSongIndex);
    }
  }

  // handle next song click
  nextSongClick() {
    this.currentSongTime = 0;
    if (this.currentSongIndex == this.songs.length - 1) {
      this.currentSongIndex = 0;
    } else {
      this.currentSongIndex += 1;
    }
    this.setCurrentSong(this.currentSongIndex);
  }

  // handle previous song click
  previousSongClick() {
    this.currentSongTime = 0;
    if (this.currentSongIndex == 0) {
      this.currentSongIndex = this.songs.length - 1;
    } else {
      this.currentSongIndex += -1;
    }
    this.setCurrentSong(this.currentSongIndex);
  }

  // set song and play
  setCurrentSong(songNumber: number) {
    this.currentSongTime = 0;
    this.currentSong = this.songs[songNumber];
    console.log(this.currentSong);
    this.audio.src = this.currentSong.url;
    this.rotateCDThump();
    this.playAudio();
  }

  
  replaySong() {
    this.audio.currentTime = 0;
  }


  repeatSongClick() {
    if (this.isRepeat) {
      this.isRepeat = false;
    } else {
      this.isRepeat = true;
    }
  }

  
  selectSong(songIndex: number) {
    this.setCurrentSong(songIndex);
  }


  deleteSong(songIndex: number) {
    this.songs.splice(songIndex);
  }
}

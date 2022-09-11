import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
})
export class SongComponent implements OnInit {
  private _songName?: string;
  private _singer?: string;
  private _url?: string;
  private _imgURL?: string;

  constructor() {}

  ngOnInit(): void {}

  public get singer(): string {
    if (this._singer) {
      return this._singer;
    } else return '';
  }

  public set singer(singer: string) {
    this._singer = singer;
  }

  public get url(): string {
    if (this._url) {
      return this._url;
    } else return '';
  }

  public set url(url: string) {
    this._url = url;
  }

  public get imgURL(): string {
    if (this._imgURL) {
      return this._imgURL;
    } else return '';
  }

  public set imgURL(imgURL: string) {
    this._imgURL = imgURL;
  }
  public get songName(): string {
    if (this._songName) {
      return this._songName;
    } else return '';
  }

  public set songName(songName: string) {
    this._songName = songName;
  }
}

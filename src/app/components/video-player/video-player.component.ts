import {
  Component,
  OnInit,
  ViewChild,
  Input,
  ElementRef,
  AfterContentInit,
} from '@angular/core';
import * as dashjs from 'dashjs';
import Hls from 'hls.js';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, AfterContentInit {
  // @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  // @Input() src!: string;
  private hls!: Hls;
  private video!: HTMLVideoElement;

  ngOnInit(): void {}
  ngAfterContentInit(): void {
    // const video = this.videoPlayer.nativeElement;
    // const player = dashjs.MediaPlayer().create();
    // player.initialize(video, this.src, true);

    this.video = document.getElementById('videoPlayer') as HTMLVideoElement;
    this.hls = new Hls();
    this.hls.loadSource('https://cdn.jwplayer.com/manifests/pZxWPRg4.m3u8');
    this.hls.attachMedia(this.video);
  }
  hoverOn() {
    this.video.play();
  }
  hoverOut() {
    this.video.pause();
  }
}

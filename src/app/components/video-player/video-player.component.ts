import {
  Component,
  OnInit,
  ViewChild,
  Input,
  ElementRef,
  AfterContentInit,
  AfterViewInit,
} from '@angular/core';
import Hls from 'hls.js';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent
  implements OnInit, AfterContentInit, AfterViewInit
{
  ngAfterContentInit(): void {}
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef;
  @Input() posterSrc!: string;
  @Input() videoSrc!: string;
  @Input() isHovering: boolean = false;
  private hls!: Hls;
  private video!: HTMLVideoElement;

  userInteracted = false;
  updateVideoSrc(videoSrc: string) {
    this.hls.loadSource(videoSrc);
  }
  ngOnInit() {
    // Add event listeners to track user interaction
    document.addEventListener('click', () => {
      this.userInteracted = true;
    });

    document.addEventListener('keydown', () => {
      this.userInteracted = true;
    });
  }
  ngAfterViewInit() {
    this.video = document.getElementById('videoPlayer') as HTMLVideoElement;
    console.log(this.videoSrc);
    console.log(this.video);
    this.hls = new Hls();
    this.hls.loadSource(this.videoSrc);
    this.hls.attachMedia(this.videoPlayer.nativeElement);

    console.log(this.videoPlayer);
    this.videoPlayer.nativeElement.innerHTML = 'DOM updated succesfully!!!';
  }
  hoverOn() {
    // this.videoPlayer.nativeElement.play();
    if (this.userInteracted && this.isHovering) {
      this.videoPlayer.nativeElement.muted = true;
      this.videoPlayer.nativeElement.play();
    }
  }
  hoverOut() {
    if (this.userInteracted && this.isHovering) {
      this.videoPlayer.nativeElement.pause();
    }
  }
}

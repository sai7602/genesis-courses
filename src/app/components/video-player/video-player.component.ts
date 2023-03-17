import {
  Component,
  OnInit,
  ViewChild,
  Input,
  ElementRef,
  AfterContentInit,
  AfterViewInit,
  HostListener,
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
  @ViewChild('videoPlayer', { static: false })
  videoPlayer!: ElementRef<HTMLVideoElement>;
  @Input() posterSrc!: string;
  @Input() videoSrc!: string;
  @Input() isHovering: boolean = false;
  @Input() lessonId: string = '';
  currentTime!: number;
  private hls!: Hls;

  userInteracted = false;
  updateVideoSrc(videoSrc: string, lessonId: string) {
    this.hls.loadSource(videoSrc);
    this.lessonId = lessonId;
    const savedTime = localStorage.getItem(`savedTime-${this.lessonId}`);
    if (savedTime) {
      this.currentTime = Number(savedTime);
      this.videoPlayer.nativeElement.currentTime = this.currentTime;
    }
  }

  @HostListener('document:click')
  @HostListener('document:keydown')
  trackUserInteraction() {
    this.userInteracted = true;
  }

  ngOnInit() {}
  ngAfterViewInit() {
    const savedTime = localStorage.getItem(`savedTime-${this.lessonId}`);
    if (savedTime) {
      this.currentTime = Number(savedTime);
      this.videoPlayer.nativeElement.currentTime = this.currentTime;
    }
    this.hls = new Hls();
    this.hls.loadSource(this.videoSrc);
    this.hls.attachMedia(this.videoPlayer.nativeElement);
  }
  hoverOn() {
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

  saveCurrentTime() {
    const currentTime = this.videoPlayer.nativeElement.currentTime;
    localStorage.setItem(`savedTime-${this.lessonId}`, String(currentTime));
  }
}

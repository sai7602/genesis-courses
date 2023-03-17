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
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef;
  @Input() posterSrc!: string;
  @Input() videoSrc!: string;
  @Input() isHovering: boolean = false;
  private hls!: Hls;

  userInteracted = false;
  updateVideoSrc(videoSrc: string) {
    this.hls.loadSource(videoSrc);
  }

  @HostListener('document:click')
  @HostListener('document:keydown')
  trackUserInteraction() {
    this.userInteracted = true;
  }

  ngOnInit() {}
  ngAfterViewInit() {
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
}

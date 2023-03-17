import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoPlayerComponent } from './video-player.component';

describe('VideoPlayerComponent', () => {
  let component: VideoPlayerComponent;
  let fixture: ComponentFixture<VideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoPlayerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update video source', () => {
    const videoSrc = '';
    const lessonId = '123';
    component.updateVideoSrc(videoSrc, lessonId);
    expect(component.videoSrc).toEqual(videoSrc);
    expect(component.lessonId).toEqual(lessonId);
  });

  it('should track user interaction', () => {
    expect(component.userInteracted).toBeFalsy();
    document.dispatchEvent(new Event('click'));
    expect(component.userInteracted).toBeTruthy();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(component.userInteracted).toBeTruthy();
  });

  it('should save current time', () => {
    const currentTime = 30;
    component.videoPlayer.nativeElement.currentTime = currentTime;
    component.saveCurrentTime();
    const savedTime = localStorage.getItem(`savedTime-${component.lessonId}`);
    expect(savedTime).toEqual(String(currentTime));
  });
});

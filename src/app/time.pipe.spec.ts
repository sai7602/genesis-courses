import { TimePipe } from './time.pipe';

describe('TimePipe', () => {
  let pipe: TimePipe;

  beforeEach(() => {
    pipe = new TimePipe();
  });

  it('should transform number to time string', () => {
    expect(pipe.transform(0)).toEqual('00:00:00');
    expect(pipe.transform(60)).toEqual('00:01:00');
    expect(pipe.transform(3600)).toEqual('01:00:00');
    expect(pipe.transform(3661)).toEqual('01:01:01');
  });
});

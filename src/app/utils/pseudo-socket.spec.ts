import {PseudoSocket} from './pseudo-socket';

describe('PseudoSocket', () => {

  let pseudoSocket: PseudoSocket

  beforeEach(() => {
    pseudoSocket = new PseudoSocket(300, 1000)
    jest.clearAllMocks();
  });

  it('generated ID should be uniq', () => {
    const id1 = pseudoSocket.generateId()
    const id2 = pseudoSocket.generateId()

    expect(id1).not.toEqual(id2);
  });

  it('generated int should be int', () => {
    const int = pseudoSocket.getRandomInt(0, Number.MAX_SAFE_INTEGER);
    expect(Number.isInteger(int)).toBeTruthy();
  });

  it('generated float should be float', () => {
    const float = pseudoSocket.getRandomFloat(0, 1e+9, 18);
    const mantissa = float % 10;
    expect(mantissa).toBeGreaterThan(0)
  });

  it('generated color should be in rgb format', () => {
    const color = pseudoSocket.getRandomColor();
    const isColor = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/g.test(color)
    expect(isColor).toBeTruthy();
  });

  it('should emit data by emitInterval', () => {
    jest.useFakeTimers();
    jest.spyOn(window, 'setInterval');

    pseudoSocket.scheduleEmit();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), pseudoSocket.emitIntervalMs);
  });

  it('should reschedule with new emitInterval', () => {
    jest.useFakeTimers();
    jest.spyOn(window, 'setInterval');

    pseudoSocket.emitIntervalMs = 400;
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), pseudoSocket.emitIntervalMs);
  });

  it('should emit proper count of data', done => {
    jest.useRealTimers();
    pseudoSocket.onMessage$.subscribe(data => {
      expect(data.length).toEqual(pseudoSocket.dataCount);
      done();
    });
    pseudoSocket.scheduleEmit();
  }, 1000);
});

import { renderHook, act } from '@testing-library/react';
import { useCountdown } from './useCountdown';
import { vi } from 'vitest';

describe('useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with correct time and not running', () => {
    const { result } = renderHook(() => useCountdown(10));
    expect(result.current.timeLeft).toBe(10);
    expect(result.current.isRunning).toBe(false);
  });

  it('starts countdown when start is called', () => {
    const { result } = renderHook(() => useCountdown(5));

    act(() => {
      result.current.start();
    });

    expect(result.current.isRunning).toBe(true);
    expect(result.current.timeLeft).toBe(5);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.timeLeft).toBe(4);
  });

  it('stops automatically when time reaches 0', () => {
    const { result } = renderHook(() => useCountdown(2));

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.timeLeft).toBe(0);
    expect(result.current.isRunning).toBe(false);
  });

  it('resets to initial time and starts running', () => {
    const { result } = renderHook(() => useCountdown(3));

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.timeLeft).toBe(2);

    act(() => {
      result.current.reset();
    });

    expect(result.current.timeLeft).toBe(3);
    expect(result.current.isRunning).toBe(true);
  });

  it('does not start if timeLeft is 0', () => {
    const { result } = renderHook(() => useCountdown(0));
    act(() => {
      result.current.start();
    });
    expect(result.current.isRunning).toBe(false);
  });

  it('does not decrement if not running', () => {
    const { result } = renderHook(() => useCountdown(5));
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.timeLeft).toBe(5);
  });
});

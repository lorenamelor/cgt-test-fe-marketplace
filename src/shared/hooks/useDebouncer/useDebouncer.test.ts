import { act, renderHook } from '@testing-library/react';

import { useDebouncer } from './useDebouncer';

describe('useDebouncer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebouncer('initial', 300));
    expect(result.current).toBe('initial');
  });

  it('updates the debounced value after the delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) => useDebouncer(value, delay),
      { initialProps: { value: 'first', delay: 300 } },
    );

    rerender({ value: 'second', delay: 300 });
    expect(result.current).toBe('first');

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe('second');
  });

  it('resets the timer when the value changes before the delay elapses', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) => useDebouncer(value, delay),
      { initialProps: { value: 'a', delay: 300 } },
    );

    rerender({ value: 'b', delay: 300 });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe('a');

    rerender({ value: 'c', delay: 300 });
    act(() => {
      jest.advanceTimersByTime(299);
    });
    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe('c');
  });

  it('respects a change in delayMs', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) => useDebouncer(value, delay),
      { initialProps: { value: 'x', delay: 500 } },
    );

    rerender({ value: 'y', delay: 100 });
    act(() => {
      jest.advanceTimersByTime(99);
    });
    expect(result.current).toBe('x');

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe('y');
  });
});

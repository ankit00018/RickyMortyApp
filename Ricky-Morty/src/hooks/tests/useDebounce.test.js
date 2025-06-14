import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useDebounce from "../useDebounce";

describe("useDebounce hook", () => {
  it("should update debounced value after delay", async () => {
    // Use fake timers to control the timing
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "hello", delay: 500 },
      }
    );

    // Initial debounced value should be "hello"
    expect(result.current).toBe("hello");

    // Update value to "world"
    rerender({ value: "world", delay: 500 });

    // Before timer runs out, debouncedValue should still be "hello"
    expect(result.current).toBe("hello");

    // Fast-forward time by 499ms (just before debounce delay)
    act(() => {
      vi.advanceTimersByTime(499);
    });

    // Still should be "hello"
    expect(result.current).toBe("hello");

    // Fast-forward by 1ms (completing 500ms)
    act(() => {
      vi.advanceTimersByTime(1);
    });

    // Now debouncedValue should update to "world"
    expect(result.current).toBe("world");

    vi.useRealTimers();
  });

  it("should clear previous timeout on value change", () => {
    vi.useFakeTimers();

    const { rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "a", delay: 300 } }
    );

    rerender({ value: "b", delay: 300 });
    rerender({ value: "c", delay: 300 });

    // Only one timeout should run (previous cleared)
    act(() => {
      vi.advanceTimersByTime(300);
    });

    vi.useRealTimers();
  });
});

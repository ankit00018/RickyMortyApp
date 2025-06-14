import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useEpisodes from "../useEpisode.js"; 
import * as api from "../../services/api.js"; 

// Mock the API module
vi.mock("../../services/api.js", () => ({
  fetchEpisodesByName: vi.fn()
}));

describe("useEpisodes Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches episodes successfully when search is provided", async () => {
    // Arrange: mock API to return episodes
    const fakeEpisodes = [{ id: 1, name: "Pilot" }, { id: 2, name: "Lawnmower Dog" }];
    api.fetchEpisodesByName.mockResolvedValue(fakeEpisodes);

    // Act: render hook with search term
    const { result } = renderHook(() => useEpisodes("pilot"));

    // Initial state should be loading
    expect(result.current.loading).toBe(true);
    expect(result.current.episodes).toEqual([]);
    expect(result.current.error).toBe("");

    // Assert: wait for episodes state update
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.episodes).toEqual(fakeEpisodes);
      expect(result.current.error).toBe("");
    });

    // Also, the API should have been called once with "pilot"
    expect(api.fetchEpisodesByName).toHaveBeenCalledWith("pilot");
  });

  it("handles API failure gracefully", async () => {
    // Arrange: mock API to reject
    api.fetchEpisodesByName.mockRejectedValue(new Error("API failed"));

    // Act: render hook with search term
    const { result } = renderHook(() => useEpisodes("failtest"));

    // Initial state should be loading
    expect(result.current.loading).toBe(true);
    expect(result.current.episodes).toEqual([]);
    expect(result.current.error).toBe("");

    // Assert: wait for error state
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.episodes).toEqual([]);
      expect(result.current.error).toBe("No episode data found");
    });

    expect(api.fetchEpisodesByName).toHaveBeenCalledWith("failtest");
  });

  it("fetches data even when search is empty", async () => {
    // Arrange: mock API to return empty array
    api.fetchEpisodesByName.mockResolvedValue([]);

    // Act: render hook with empty search
    const { result } = renderHook(() => useEpisodes(""));

    // Initial state should be loading
    expect(result.current.loading).toBe(true);
    expect(result.current.episodes).toEqual([]);
    expect(result.current.error).toBe("");

    // Assert: wait for final state
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.episodes).toEqual([]);
      expect(result.current.error).toBe("");
    });

    // API should still be called with empty string
    expect(api.fetchEpisodesByName).toHaveBeenCalledWith("");
  });
});

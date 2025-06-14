import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useEpisodes from "../useEpisode.js"; 
import * as api from "../../services/api.js"; 

vi.mock("../../services/api.js");

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

    const { result } = renderHook(() => useEpisodes("failtest"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.episodes).toEqual([]);
      expect(result.current.error).toBe("No episode data found");
    });

    expect(api.fetchEpisodesByName).toHaveBeenCalledWith("failtest");
  });

  it("does not fetch and resets states when search is empty", () => {
    const { result } = renderHook(() => useEpisodes(""));

    expect(result.current.loading).toBe(false);
    expect(result.current.episodes).toEqual([]);
    expect(result.current.error).toBe("");
    expect(api.fetchEpisodesByName).not.toHaveBeenCalled();
  });
});

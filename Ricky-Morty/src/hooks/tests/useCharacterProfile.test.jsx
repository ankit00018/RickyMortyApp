import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useCharacterProfile from "../useCharacterProfile";

vi.mock("../../services/api", () => ({
  fetchCharacterById: vi.fn(),
  fetchEpisodesByIds: vi.fn(),
}));

import { fetchCharacterById, fetchEpisodesByIds } from "../../services/api";

describe("useCharacterProfile Hook", () => {
  const mockCharacter = {
    id: 1,
    name: "Rick Sanchez",
    episode: [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2",
    ],
  };

  const mockEpisodes = [
    { id: 1, name: "Pilot" },
    { id: 2, name: "Lawnmower Dog" },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("fetches character and episodes successfully", async () => {
    fetchCharacterById.mockResolvedValue(mockCharacter);
    fetchEpisodesByIds.mockResolvedValue(mockEpisodes);

    const { result } = renderHook(() => useCharacterProfile(1));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(fetchCharacterById).toHaveBeenCalledWith(1);
    expect(fetchEpisodesByIds).toHaveBeenCalledWith(["1", "2"]);

    expect(result.current.character).toEqual(mockCharacter);
    expect(result.current.episodes).toEqual(mockEpisodes);
    expect(result.current.loading).toBe(false);
  });

  it("handles errors and sets loading to false", async () => {
    fetchCharacterById.mockRejectedValue(new Error("API error"));

    const { result } = renderHook(() => useCharacterProfile(1));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.character).toBeNull();
    expect(result.current.episodes).toEqual([]);
    expect(result.current.loading).toBe(false);
  });
});

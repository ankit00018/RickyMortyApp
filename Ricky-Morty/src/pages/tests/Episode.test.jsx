import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Episodes from "../Episodes";
import * as useEpisodeHook from "../../hooks/useEpisode";

// Mock the useEpisode hook
vi.mock("../../hooks/useEpisode");

describe("Episodes component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    useEpisodeHook.default = vi.fn().mockReturnValue({
      episodes: [],
      loading: true,
      error: null,
    });

    render(<Episodes />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    useEpisodeHook.default = vi.fn().mockReturnValue({
      episodes: [],
      loading: false,
      error: "Failed to fetch episodes",
    });

    render(<Episodes />);
    expect(screen.getByText("Failed to fetch episodes")).toBeInTheDocument();
  });

  it("renders list of episodes", async () => {
  useEpisodeHook.default = vi.fn().mockReturnValue({
    episodes: [
      {
        id: "1",
        name: "Pilot",
        air_date: "December 2, 2013",
        episode: "S01E01",
        characters: ["Rick", "Morty", "Beth"],
      },
      {
        id: "2",
        name: "Lawnmower Dog",
        air_date: "December 9, 2013",
        episode: "S01E02",
        characters: ["Rick", "Morty"],
      },
    ],
    loading: false,
    error: null,
  });

  render(<Episodes />);

  await waitFor(() => {
    expect(screen.getByText("Pilot")).toBeInTheDocument();
    expect(screen.getByText("Lawnmower Dog")).toBeInTheDocument();
    expect(screen.getAllByText("Air Date:")).toHaveLength(2); // ✅ FIXED
    expect(screen.getAllByText("Episode:")).toHaveLength(2);
    expect(screen.getAllByText("Characters:")).toHaveLength(2);
  });
});

});

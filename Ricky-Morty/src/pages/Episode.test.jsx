import { render, screen, fireEvent } from "@testing-library/react";
import Episodes from "../pages/Episodes";
import useEpisodes from "../hooks/useEpisode";

vi.mock("../hooks/useEpisode");

describe("Episodes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    useEpisodes.mockReturnValue({ episodes: [], loading: true, error: "" });

    render(<Episodes />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("renders error message", () => {
    useEpisodes.mockReturnValue({
      episodes: [],
      loading: false,
      error: "No episodes found",
    });

    render(<Episodes />);
    expect(screen.getByText(/no episodes found/i)).toBeInTheDocument();
  });

  it("renders episodes list and filters", () => {
    const mockEpisodes = [
      {
        id: 1,
        name: "Pilot",
        air_date: "December 2, 2013",
        episode: "S01E01",
        characters: ["url1", "url2"],
      },
    ];
    useEpisodes.mockReturnValue({
      episodes: mockEpisodes,
      loading: false,
      error: "",
    });

    render(<Episodes />);

    // Search input present
    expect(screen.getByPlaceholderText(/search episode/i)).toBeInTheDocument();

    // Episode name shown
    expect(screen.getByText(/pilot/i)).toBeInTheDocument();
    expect(screen.getByText(/December 2, 2013/i)).toBeInTheDocument();

    // Characters count - fixed assertion here
    const charactersElement = screen.getByText(/characters:/i).closest("p");
    expect(charactersElement).toHaveTextContent("2");
  });

  it("updates search input", () => {
    useEpisodes.mockReturnValue({ episodes: [], loading: false, error: "" });

    render(<Episodes />);
    const input = screen.getByPlaceholderText(/search episode/i);
    fireEvent.change(input, { target: { value: "Pilot" } });
    expect(input.value).toBe("Pilot");
  });
});

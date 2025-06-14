import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "../Home";

// Mock the lazy-loaded CharacterCard
vi.mock("../../components/CharacterCard", () => ({
  default: ({ character }) => <div>Character: {character.name}</div>,
}));

// Mock the useCharacterData hook
vi.mock("../../hooks/useCharacterData", () => ({
  default: vi.fn(),
}));

// Import the mocked hook here to configure its return value
import useCharacterData from "../../hooks/useCharacterData";

describe("Home Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    useCharacterData.mockReturnValue({
      character: [],
      loading: true,
      hasMore: false,
    });

    render(<Home search="" filters={{}} />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders character cards", async () => {
    useCharacterData.mockReturnValue({
      character: [{ id: 1, name: "Rick" }, { id: 2, name: "Morty" }],
      loading: false,
      hasMore: false,
    });

    render(<Home search="" filters={{}} />);

    await waitFor(() => {
      expect(screen.getByText("Character: Rick")).toBeInTheDocument();
      expect(screen.getByText("Character: Morty")).toBeInTheDocument();
    });
  });

  it("shows no characters found message", async () => {
    useCharacterData.mockReturnValue({
      character: [],
      loading: false,
      hasMore: false,
    });

    render(<Home search="unknown" filters={{}} />);
    await waitFor(() => {
      expect(screen.getByText(/No characters found/i)).toBeInTheDocument();
    });
  });

  it("loads more characters when button is clicked", async () => {
    const mockCharacters = [
      { id: 1, name: "Rick" },
      { id: 2, name: "Morty" },
    ];
    useCharacterData.mockReturnValue({
      character: mockCharacters,
      loading: false,
      hasMore: true,
    });

    render(<Home search="" filters={{}} />);

    // Wait for character cards
    await waitFor(() => {
      expect(screen.getByText("Character: Rick")).toBeInTheDocument();
    });

    // Ensure "Load More" button exists
    const loadMoreButton = screen.getByRole("button", { name: /load more/i });
    expect(loadMoreButton).toBeInTheDocument();

    // Click the load more button (won't test actual pagination, only render presence)
    fireEvent.click(loadMoreButton);
  });
});

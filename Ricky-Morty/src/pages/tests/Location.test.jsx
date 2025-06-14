import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Locations from "../Locations";
import * as useLocationsHook from "../../hooks/useLocations";

// Mock the hooks
vi.mock("../../hooks/useLocations");
vi.mock("../../hooks/useDebounce", () => ({
  default: (value) => value
}));

describe("Locations component", () => {
  const mockLocations = [
    {
      id: 1,
      name: "Earth",
      type: "Planet",
      dimension: "Dimension C-137",
      residents: ["resident1", "resident2"],
    },
    {
      id: 2,
      name: "Mars",
      type: "Planet",
      dimension: "Dimension C-138",
      residents: ["resident3"],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    useLocationsHook.default = vi.fn().mockReturnValue({
      loading: false,
      error: null,
      locationData: [],
    });
  });

  it("renders loading state", () => {
    useLocationsHook.default = vi.fn().mockReturnValue({
      loading: true,
      error: null,
      locationData: [],
    });

    render(<Locations />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    useLocationsHook.default = vi.fn().mockReturnValue({
      loading: false,
      error: "Failed to fetch locations",
      locationData: [],
    });

    render(<Locations />);
    expect(screen.getByText("Failed to fetch locations")).toBeInTheDocument();
  });

  it("renders list of locations", () => {
    useLocationsHook.default = vi.fn().mockReturnValue({
      loading: false,
      error: null,
      locationData: mockLocations,
    });

    render(<Locations />);

    // Check location names
    expect(screen.getByText("Earth")).toBeInTheDocument();
    expect(screen.getByText("Mars")).toBeInTheDocument();

    // Check details using function matcher for split text nodes
    expect(
      screen.getAllByText((_, node) =>
        node.textContent === "Type: Planet"
      )
    ).toHaveLength(2);

    expect(
      screen.getByText((_, node) =>
        node.textContent === "Dimension: Dimension C-137"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, node) =>
        node.textContent === "Dimension: Dimension C-138"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, node) =>
        node.textContent === "Residents: 2"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, node) =>
        node.textContent === "Residents: 1"
      )
    ).toBeInTheDocument();
  });

  it("updates search input", () => {
    useLocationsHook.default = vi.fn().mockReturnValue({
      loading: false,
      error: null,
      locationData: mockLocations,
    });

    render(<Locations />);
    
    const searchInput = screen.getByPlaceholderText("Search Location");
    fireEvent.change(searchInput, { target: { value: "Earth" } });
    
    expect(searchInput).toHaveValue("Earth");
    expect(useLocationsHook.default).toHaveBeenCalledWith("Earth");
  });
});
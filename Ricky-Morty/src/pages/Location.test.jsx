import { render, screen, fireEvent } from "@testing-library/react";
import Locations from "../pages/Locations";
import useLocations from "../hooks/useLocations";

vi.mock("../hooks/useLocations");

describe("Locations component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    useLocations.mockReturnValue({
      locationData: [],
      loading: true,
      error: "",
    });
    render(<Locations />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("renders error message", () => {
    useLocations.mockReturnValue({
      locationData: [],
      loading: false,
      error: "No location found.",
    });
    render(<Locations />);
    expect(screen.getByText(/no location found/i)).toBeInTheDocument();
  });

  it("renders locations list", () => {
    const mockLocations = [
      {
        id: 1,
        name: "Earth (C-137)",
        type: "Planet",
        dimension: "Dimension C-137",
        residents: ["url1", "url2"],
      },
    ];
    useLocations.mockReturnValue({
      locationData: mockLocations,
      loading: false,
      error: "",
    });
    render(<Locations />);
    expect(screen.getByText(/earth \(c-137\)/i)).toBeInTheDocument();
    expect(screen.getByText(/planet/i)).toBeInTheDocument();
    expect(screen.getByText(/dimension c-137/i)).toBeInTheDocument();
    const residentsElement = screen.getByText(/residents:/i).closest("p"); 
    expect(residentsElement).toHaveTextContent("2");
  });

  it("updates search input", () => {
    useLocations.mockReturnValue({
      locationData: [],
      loading: false,
      error: "",
    });
    render(<Locations />);
    const input = screen.getByPlaceholderText(/search location/i);
    fireEvent.change(input, { target: { value: "Earth" } });
    expect(input.value).toBe("Earth");
  });
});

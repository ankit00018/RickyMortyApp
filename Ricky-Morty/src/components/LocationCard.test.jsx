import { render, screen } from "@testing-library/react";
import LocationCard from "./LocationCard"; // adjust the path if needed

describe("LocationCard Component", () => {
  const mockLocation = {
    name: "Citadel of Ricks",
    type: "Space station",
    dimension: "Dimension C-137",
  };

  it("renders location name, type, and dimension correctly", () => {
    render(<LocationCard location={mockLocation} />);

    // Assert name
    expect(screen.getByRole("heading", { name: /citadel of ricks/i })).toBeInTheDocument();

    // Assert type
    expect(screen.getByText(/type:/i)).toBeInTheDocument();
    expect(screen.getByText(/space station/i)).toBeInTheDocument();

    // Assert dimension
    expect(screen.getByText(/dimension:/i)).toBeInTheDocument();
    expect(screen.getByText(/dimension c-137/i)).toBeInTheDocument();
  });
});

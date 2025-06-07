import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // needed to wrap for Link components
import Navbar from "./Navbar"; // adjust path if needed

describe("Navbar Component", () => {
  it("renders navigation links with correct hrefs", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check the "Home" link
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");

    // Check the "Locations" link
    const locationsLink = screen.getByRole("link", { name: /locations/i });
    expect(locationsLink).toBeInTheDocument();
    expect(locationsLink).toHaveAttribute("href", "/locations");

    // Check the "Episodes" link
    const episodesLink = screen.getByRole("link", { name: /episodes/i });
    expect(episodesLink).toBeInTheDocument();
    expect(episodesLink).toHaveAttribute("href", "/episodes");
  });
});

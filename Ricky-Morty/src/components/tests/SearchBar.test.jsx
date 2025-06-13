import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar"; // adjust path as needed

describe("SearchBar Component", () => {
  it("renders input with correct placeholder and value", () => {
    const mockValue = "Rick";
    const mockOnChange = vi.fn();

    render(<SearchBar value={mockValue} onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText(/search character by name/i);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe(mockValue);
  });

  it("calls onChange when input value changes", () => {
    const mockOnChange = vi.fn();

    render(<SearchBar value="" onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText(/search character by name/i);

    fireEvent.change(input, { target: { value: "Morty" } });

    // onChange should be called with "Morty"
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith("Morty");
  });
});

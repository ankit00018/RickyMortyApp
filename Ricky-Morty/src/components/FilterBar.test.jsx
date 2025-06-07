import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import FilterBar from "../components/FilterBar";

describe("FilterBar component", () => {
  const filters = {
    status: "",
    gender: "",
    location: "",
    episode: "",
    species: "",
    type: "",
  };

  const setFilters = vi.fn();

  beforeEach(() => {
    setFilters.mockClear();
  });

  it("renders all filter selects", () => {
    render(<FilterBar filters={filters} setFilters={setFilters} />);
    
    expect(screen.getByTestId("filter-status")).toBeInTheDocument();
    expect(screen.getByTestId("filter-gender")).toBeInTheDocument();
    expect(screen.getByTestId("filter-location")).toBeInTheDocument();
    expect(screen.getByTestId("filter-episode")).toBeInTheDocument();
    expect(screen.getByTestId("filter-species")).toBeInTheDocument();
    expect(screen.getByTestId("filter-type")).toBeInTheDocument();
  });

  it("calls setFilters on status change", () => {
    render(<FilterBar filters={filters} setFilters={setFilters} />);
    
    fireEvent.change(screen.getByTestId("filter-status"), { target: { value: "alive" } });
    
    expect(setFilters).toHaveBeenCalledWith(expect.any(Function));
  });

  it("calls setFilters on gender change", () => {
    render(<FilterBar filters={filters} setFilters={setFilters} />);
    
    fireEvent.change(screen.getByTestId("filter-gender"), { target: { value: "male" } });
    
    expect(setFilters).toHaveBeenCalledWith(expect.any(Function));
  });

});

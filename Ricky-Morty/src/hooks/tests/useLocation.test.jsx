import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useLocations from "../useLocations.js"; 
import * as api from "../../services/api.js";

vi.mock("../../services/api.js");

describe("useLocations Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches location data successfully when search is provided", async () => {
    const fakeLocations = [
      { id: 1, name: "Earth (C-137)" },
      { id: 2, name: "Abadango" },
    ];
    api.fetchLocationsByName.mockResolvedValue(fakeLocations);

    const { result } = renderHook(() => useLocations("Earth"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.locationData).toEqual(fakeLocations);
      expect(result.current.error).toBe("");
    });

    expect(api.fetchLocationsByName).toHaveBeenCalledWith("Earth");
  });

  it("handles API failure correctly", async () => {
    api.fetchLocationsByName.mockRejectedValue(new Error("API failure"));

    const { result } = renderHook(() => useLocations("unknown"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.locationData).toEqual([]);
      expect(result.current.error).toBe("No location found.");
    });

    expect(api.fetchLocationsByName).toHaveBeenCalledWith("unknown");
  });

  it("starts loading and fetches data when search changes", async () => {
    // mock API with some dummy data
    api.fetchLocationsByName.mockResolvedValue([{ id: 3, name: "Test Location" }]);

    const { result, rerender } = renderHook(({ search }) => useLocations(search), {
      initialProps: { search: "Test" },
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.locationData.length).toBeGreaterThan(0);

    // Rerender with a different search value
    api.fetchLocationsByName.mockResolvedValue([{ id: 4, name: "Another Location" }]);
    rerender({ search: "Another" });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.locationData[0].name).toBe("Another Location");
  });
});
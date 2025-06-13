import { render, screen } from "@testing-library/react";
import CharacterProfile from "../CharacterProfile";
import useCharacterProfile from "../../hooks/useCharacterProfile";
import { useParams } from "react-router-dom";

vi.mock("../hooks/useCharacterProfile");
vi.mock("react-router-dom", () => ({
  useParams: vi.fn(),
}));

describe("CharacterProfile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading initially", () => {
    useParams.mockReturnValue({ id: "1" });
    useCharacterProfile.mockReturnValue({
      character: null,
      episodes: [],
      loading: true,
    });

    render(<CharacterProfile />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("renders character profile and episodes", () => {
    useParams.mockReturnValue({ id: "1" });
    useCharacterProfile.mockReturnValue({
      character: {
        name: "Rick Sanchez",
        image: "image-url",
        status: "Alive",
        species: "Human",
        gender: "Male",
        type: "",
        origin: { name: "Earth" },
        location: { name: "Earth" },
      },
      episodes: [
        { id: 1, name: "Pilot", air_date: "December 2, 2013" },
        { id: 2, name: "Lawnmower Dog", air_date: "December 9, 2013" },
      ],
      loading: false,
    });

    render(<CharacterProfile />);

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "image-url");

    expect(screen.getByText(/Status:/i).closest("p")).toHaveTextContent("Alive");
    expect(screen.getByText(/Species:/i).closest("p")).toHaveTextContent("Human");
    expect(screen.getByText(/Gender:/i).closest("p")).toHaveTextContent("Male");

    // Check origin Earth specifically (using heading + next sibling)
    const originHeading = screen.getByRole("heading", { name: /origin/i });
    expect(originHeading.nextElementSibling).toHaveTextContent("Earth");

    // Check location Earth specifically (using heading + next sibling)
    const locationHeading = screen.getByRole("heading", { name: /location/i });
    expect(locationHeading.nextElementSibling).toHaveTextContent("Earth");

    expect(screen.getByText(/origin/i)).toBeInTheDocument();
    expect(screen.getByText(/episodes/i)).toBeInTheDocument();

    // Check episodes listed
    expect(screen.getByText(/pilot/i)).toBeInTheDocument();
    expect(screen.getByText(/December 2, 2013/i)).toBeInTheDocument();
  });
});

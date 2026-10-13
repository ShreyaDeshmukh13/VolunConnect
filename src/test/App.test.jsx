import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { RegistrationProvider } from "../context/RegistrationContext";
import OpportunityList from "../components/OpportunityList";
import MyRegistrations from "../pages/MyRegistrations";
import OpportunityDetails from "../pages/OpportunityDetails";
import { Routes, Route } from "react-router-dom";

const Wrapper = ({ children, route = "/" }) => (
  <MemoryRouter initialEntries={[route]}><RegistrationProvider>{children}</RegistrationProvider></MemoryRouter>
);

function ListHarness({ onSelect = () => {} }) {
  const [cat, setCat] = React.useState("All");
  const [q, setQ] = React.useState("");
  const { useRegistrations } = require_ctx();
  const { opportunities } = useRegistrations();
  return (
    <OpportunityList opportunities={opportunities} selectedCategory={cat} onSelectCategory={setCat}
      searchQuery={q} onSearchChange={setQ} onSelectOpportunity={onSelect} />
  );
}
import * as ctx from "../context/RegistrationContext";
const require_ctx = () => ctx;

describe("OpportunityList", () => {
  it("renders all six opportunities", () => {
    render(<Wrapper><ListHarness /></Wrapper>);
    expect(screen.getAllByRole("article")).toHaveLength(6);
  });
  it("filters by category", async () => {
    render(<Wrapper><ListHarness /></Wrapper>);
    await userEvent.click(screen.getByRole("button", { name: "Healthcare" }));
    expect(screen.getAllByRole("article")).toHaveLength(1);
  });
  it("filters by (debounced) search text and shows empty state", async () => {
    render(<Wrapper><ListHarness /></Wrapper>);
    await userEvent.type(screen.getByLabelText(/search volunteer/i), "zzzz");
    expect(await screen.findByText(/No Opportunities Found/i)).toBeInTheDocument();
  });
  it("calls onSelectOpportunity when register is clicked", async () => {
    const onSelect = vi.fn();
    render(<Wrapper><ListHarness onSelect={onSelect} /></Wrapper>);
    const first = screen.getAllByRole("article")[0];
    await userEvent.click(within(first).getByRole("button", { name: /register for/i }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});

describe("pages", () => {
  it("shows empty state on My Registrations", () => {
    render(<Wrapper><MyRegistrations /></Wrapper>);
    expect(screen.getByText(/No registrations yet/i)).toBeInTheDocument();
  });
  it("shows details for a valid id and not-found for an invalid one", () => {
    const routes = (
      <Routes><Route path="/opportunities/:id" element={<OpportunityDetails />} /></Routes>
    );
    const { unmount } = render(<Wrapper route="/opportunities/1">{routes}</Wrapper>);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Tree Plantation/i);
    unmount();
    render(<Wrapper route="/opportunities/99">{routes}</Wrapper>);
    expect(screen.getByText(/Opportunity not found/i)).toBeInTheDocument();
  });
});

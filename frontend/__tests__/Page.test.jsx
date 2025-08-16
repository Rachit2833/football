// __tests__/Home.test.jsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../app/page.js"; // adjust path if needed
jest.mock("../app/_Component/Header.jsx", () => () => <div>Mock Header</div>);
jest.mock("../app/_Component/MatchCard.jsx", () => () => (
  <div data-testid="test-card">Mock MatchCard</div>
));
jest.mock("../app/_Component/PaginationDemo.jsx", () => () => (
  <div>Mock Pagination</div>
));

describe("Home Page", () => {

  it("Home Page Ui", async () => {
    const ui = await Home();
    render(ui);
    expect(await screen.findByText("FootBall Season 2025-26")).toBeInTheDocument();


  })
  it("renders the correct number of MatchCards from the mocked API", async () => {
    const ui = await Home();
    render(ui);
    const cards = await screen.findAllByTestId("test-card");
    expect(cards).toHaveLength(2);
  });
});

import { render, screen } from "@testing-library/react";
import Page from "../app/stats/page.js";

jest.mock("../app/_Component/MatchStatsTable.jsx", () => () => (
  <div data-testid="main-card">Stats Card</div>
));

describe("Stats Page", () => {
  it("renders MatchStatsTable with MSW mocked data", async () => {
    // ✅ pass params since Page expects them
    const ui = await Page({ params: { id: "689ca84721276f98db1fd6e3" } });

    render(ui);

    // our mocked component should render once
    const cards = await screen.findAllByTestId("main-card");
    expect(cards).toHaveLength(1);
  });
});

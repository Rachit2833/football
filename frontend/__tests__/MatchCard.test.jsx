import { render, screen } from "@testing-library/react";
import MatchCard from "../app/_Component/MatchCard";

describe("MatchCard", () => {
    const mockItem = {
        stage: "Final",
        date: "2025-05-03",
        teamAName: "Dragons FC",
        teamBName: "Tigers United",
    };

    it("renders the date and team names", () => {
        render(<MatchCard item={mockItem} />);

        // Date
        expect(screen.getByText("2025-05-03")).toBeInTheDocument();

        // Teams
        expect(screen.getByText("Dragons FC")).toBeInTheDocument();
        expect(screen.getByText("Tigers United")).toBeInTheDocument();

        // Separator "vs"
        expect(screen.getByText("vs")).toBeInTheDocument();
    });

    it("renders the stage ribbon with correct text and style", () => {
        const { container } = render(<MatchCard item={mockItem} />);

        const ribbon = container.querySelector("div.absolute"); // stage ribbon div
        expect(ribbon).toHaveTextContent("Final");
        expect(ribbon.className).toMatch(/bg-red-600/); // red for Final
    });
    it("renders League stage with green ribbon", () => {
        const { container } = render(
            <MatchCard item={{ ...mockItem, stage: "League" }} />
        );
        const ribbon = container.querySelector("div.absolute");
        expect(ribbon).toHaveTextContent("League");
        expect(ribbon.className).toMatch(/bg-green-500/);
    });
    it("renders Knockouts stage with green ribbon", () => {
        const { container } = render(
            <MatchCard item={{ ...mockItem, stage: "Knockouts" }} />
        );
        const ribbon = container.querySelector("div.absolute");
        expect(ribbon).toHaveTextContent("Knockouts");
        expect(ribbon.className).toMatch(/bg-yellow-500/);
    });
     it("renders Final stage with green ribbon", () => {
        const { container } = render(
            <MatchCard item={{ ...mockItem, stage: "Final" }} />
        );
        const ribbon = container.querySelector("div.absolute");
        expect(ribbon).toHaveTextContent("Final");
        expect(ribbon.className).toMatch(/bg-red-600/);
    });
});

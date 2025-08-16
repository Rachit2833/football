// __tests__/MatchStatsTable.test.jsx
import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import MatchStatsTable from "../app/_Component/MatchStatsTable";

describe("MatchStatsTable", () => {
  const mockData = {
    teamAName: "Dragons FC",
    teamBName: "Tigers United",
    date: "2025-05-03",
    stage: "League",
    stats: {
      teamA: {
        goals: 2,
        possession: "55%",
        passes: 480,
        shots: 10,
        shotsOnTarget: 6,
        corners: 5,
      },
      teamB: {
        goals: 1,
        possession: "45%",
        passes: 420,
        shots: 8,
        shotsOnTarget: 4,
        corners: 3,
      },
    },
  };

  it("renders header with team names, date and stage", () => {
    render(<MatchStatsTable data={mockData} />);

    expect(
      screen.getByText(`${mockData.teamAName} vs ${mockData.teamBName}`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockData.stage)).toBeInTheDocument();
    expect(screen.getByText(mockData.date)).toBeInTheDocument();
  });

  it("shows the winner badge when a team wins", () => {
    render(<MatchStatsTable data={mockData} />);
    const winnerBadge = screen.getByTestId("winner-badge");
    expect(winnerBadge).toBeInTheDocument();
    expect(winnerBadge).toHaveTextContent("Dragons FC");
  });

  it("renders all stat labels in the table", () => {
    render(<MatchStatsTable data={mockData} />);
    const labels = [
      "Goals",
      "Possession",
      "Passes",
      "Shots",
      "Shots on Target",
      "Corners",
    ];

    const table = screen.getByRole("table");
    labels.forEach((label) => {
      expect(within(table).getByText(label)).toBeInTheDocument();
    });
  });

  it("renders correct stat values for both teams", () => {
    render(<MatchStatsTable data={mockData} />);
    const table = screen.getByRole("table");

    // Team A values
    expect(within(table).getByText("2")).toBeInTheDocument();
    expect(within(table).getByText("55%")).toBeInTheDocument();
    expect(within(table).getByText("480")).toBeInTheDocument();
    expect(within(table).getByText("10")).toBeInTheDocument();
    expect(within(table).getByText("6")).toBeInTheDocument();
    expect(within(table).getByText("5")).toBeInTheDocument();

    // Team B values
    expect(within(table).getByText("1")).toBeInTheDocument();
    expect(within(table).getByText("45%")).toBeInTheDocument();
    expect(within(table).getByText("420")).toBeInTheDocument();
    expect(within(table).getByText("8")).toBeInTheDocument();
    expect(within(table).getByText("4")).toBeInTheDocument();
    expect(within(table).getByText("3")).toBeInTheDocument();
  });

  it("applies bold/green style to higher stat values", () => {
    render(<MatchStatsTable data={mockData} />);

    const teamAGoalsCell = screen.getByText("2");
    expect(teamAGoalsCell.className).toMatch(/text-green-600/);

    const teamBGoalsCell = screen.getByText("1");
    expect(teamBGoalsCell.className).not.toMatch(/text-green-600/);

    const teamAPossessionCell = screen.getByText("55%");
    expect(teamAPossessionCell.className).toMatch(/text-green-600/);

    const teamBPossessionCell = screen.getByText("45%");
    expect(teamBPossessionCell.className).not.toMatch(/text-green-600/);
  });

  it("renders mobile cards with both teams' stats", () => {
    render(<MatchStatsTable data={mockData} />);

    expect(screen.getByText(/Dragons FC: 2/)).toBeInTheDocument();
    expect(screen.getByText(/Tigers United: 1/)).toBeInTheDocument();
    expect(screen.getByText(/Dragons FC: 480/)).toBeInTheDocument();
    expect(screen.getByText(/Tigers United: 420/)).toBeInTheDocument();
  });

  it("shows 'Draw' as winner when goals are equal", () => {
    const drawData = {
      ...mockData,
      stats: {
        teamA: { ...mockData.stats.teamA, goals: 2 },
        teamB: { ...mockData.stats.teamB, goals: 2 },
      },
    };

    render(<MatchStatsTable data={drawData} />);
    expect(screen.queryByTestId("winner-badge")).not.toBeInTheDocument();
    expect(screen.getByText("Dragons FC")).toBeInTheDocument();
    expect(screen.getByText("Tigers United")).toBeInTheDocument();
  });
});

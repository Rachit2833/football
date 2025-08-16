"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

export default function MatchStatsTable({ data }) {
  const { stats, teamAName, teamBName, date, stage } = data;

  const statKeys = [
    { key: "goals", label: "Goals" },
    { key: "possession", label: "Possession" },
    { key: "passes", label: "Passes" },
    { key: "shots", label: "Shots" },
    { key: "shotsOnTarget", label: "Shots on Target" },
    { key: "corners", label: "Corners" },
  ];

  const winner =
    stats.teamA.goals > stats.teamB.goals
      ? teamAName
      : stats.teamB.goals > stats.teamA.goals
      ? teamBName
      : "Draw";

  return (
    <Card data-testid="main-card" className="w-full max-w-5xl shadow-xl">
      {/* Header */}
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CardTitle
          className="text-2xl sm:text-4xl font-extrabold text-center sm:text-left"
          data-testid="match-title"
        >
          {teamAName} vs {teamBName}
        </CardTitle>
        <div className="flex items-center gap-3 text-sm sm:text-lg text-muted-foreground flex-wrap justify-center sm:justify-end">
          <Badge
            data-testid="stage-badge"
            variant="outline"
            className="px-3 py-1"
          >
            {stage}
          </Badge>
          <span data-testid="match-date" className="font-medium">
            {date}
          </span>
          {winner !== "Draw" && (
            <Badge
              data-testid="winner-badge"
              className="flex items-center gap-2 px-3 py-1 text-base sm:text-lg"
            >
              <Trophy size={20} /> {winner}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <Table className="text-base" data-testid="desktop-table">
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg">Stat</TableHead>
                <TableHead className="text-lg">{teamAName}</TableHead>
                <TableHead className="text-lg">{teamBName}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statKeys.map((stat) => (
                <TableRow key={stat.key} data-testid={`row-${stat.key}`}>
                  <TableCell
                    className="font-semibold py-3"
                    data-testid={`label-${stat.key}`}
                  >
                    {stat.label}
                  </TableCell>
                  <TableCell
                    className={`py-3 ${
                      stats.teamA[stat.key] > stats.teamB[stat.key]
                        ? "font-bold text-green-600 dark:text-green-400"
                        : ""
                    }`}
                    data-testid={`teamA-${stat.key}`}
                  >
                    {stats.teamA[stat.key]}
                  </TableCell>
                  <TableCell
                    className={`py-3 ${
                      stats.teamB[stat.key] > stats.teamA[stat.key]
                        ? "font-bold text-green-600 dark:text-green-400"
                        : ""
                    }`}
                    data-testid={`teamB-${stat.key}`}
                  >
                    {stats.teamB[stat.key]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="grid sm:hidden gap-4 mt-4" data-testid="mobile-cards">
          {statKeys.map((stat) => (
            <div
              key={stat.key}
              className="p-4 rounded-lg border bg-card flex flex-col gap-2 shadow-sm"
              data-testid={`mobile-card-${stat.key}`}
            >
              <div
                className="text-sm font-medium text-muted-foreground"
                data-testid={`mobile-label-${stat.key}`}
              >
                {stat.label}
              </div>
              <div className="flex justify-between items-center text-lg font-semibold">
                <span
                  className={
                    stats.teamA[stat.key] > stats.teamB[stat.key]
                      ? "text-green-600 dark:text-green-400"
                      : ""
                  }
                  data-testid={`mobile-teamA-${stat.key}`}
                >
                  {teamAName}: {stats.teamA[stat.key]}
                </span>
                <span
                  className={
                    stats.teamB[stat.key] > stats.teamA[stat.key]
                      ? "text-green-600 dark:text-green-400"
                      : ""
                  }
                  data-testid={`mobile-teamB-${stat.key}`}
                >
                  {teamBName}: {stats.teamB[stat.key]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

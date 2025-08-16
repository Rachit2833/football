import MatchStatsTable from "../_Component/MatchStatsTable.jsx";

export default async function Page({params}) {
  const res = await fetch(`http://localhost:2833/data/${params.id}`, {});

  if (!res.ok) {
    throw new Error("Failed to fetch match data");
  }

  const matchData = await res.json();

  return (
    <main className="p-6 flex justify-center items-center min-h-screen bg-background">
      <MatchStatsTable data={matchData.data} />
    </main>
  );
}

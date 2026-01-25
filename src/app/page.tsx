import AverageChart from "@/components/average-chart";
import { getMatches } from "@/lib/dartcounter";

async function Page() {
  const matches = await getMatches();
  const data = [...matches]
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    )
    .map((match) => ({
      created_at: match.created_at,
      avg: match.users[0].three_dart_average || 0,
    }));

  return <AverageChart data={data} />;
}

export default Page;

import { json } from '@/jest.config';
import { http } from 'msw';

const handlers = [
  http.get('http://localhost:2833/data', (req, res, ctx) => {
    console.log('✅ MSW intercepted request in test');
    return Response.json([
      {
        _id: "1",
        date: "2025-05-03",
        stage: "League",
        teamAName: "Dragons FC",
        teamBName: "Tigers United",
      },
      {
        _id: "2",
        date: "2025-05-04",
        stage: "Knockouts",
        teamAName: "Sharks FC",
        teamBName: "Eagles United",
      },
    ]);
  }),
  http.get("http://localhost:2833/data/:id", ({ params }) => {
    return Response.json({
      data: {
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
        _id: params.id,
        date: "03-05-2023",
        stage: "League",
        teamAName: "Dragons FC",
        teamBName: "Tigers United",
      },
    });
  }),
];

export default handlers;

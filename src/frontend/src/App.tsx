import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AIProjections } from "./components/AIProjections";
import { BettingTrendsCard } from "./components/BettingTrendsCard";
import { ExpertPicksCard } from "./components/ExpertPicksCard";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { InjuryReportsCard } from "./components/InjuryReportsCard";
import { MatchupCards } from "./components/MatchupCards";
import { OddsComparison } from "./components/OddsComparison";
import { TeamStatsCard } from "./components/TeamStatsCard";
import {
  useBettingTrends,
  useExpertPicks,
  useInjuryReports,
  useMatchups,
  useTeamStats,
} from "./hooks/useQueries";

const queryClient = new QueryClient();

function Dashboard() {
  const { data: matchups = [], isLoading: matchupsLoading } = useMatchups();
  const { data: teamStats = [], isLoading: statsLoading } = useTeamStats();
  const { data: trends = [], isLoading: trendsLoading } = useBettingTrends();
  const { data: injuries = [], isLoading: injuriesLoading } =
    useInjuryReports();
  const { data: picks = [], isLoading: picksLoading } = useExpertPicks();

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <Hero />

        {/* Featured Matchups */}
        <MatchupCards matchups={matchups} isLoading={matchupsLoading} />

        {/* Analytics Row: Odds | Team Stats | AI Projections */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <OddsComparison matchups={matchups} isLoading={matchupsLoading} />
            <TeamStatsCard
              teamStats={teamStats}
              matchups={matchups}
              isLoading={statsLoading}
            />
            <AIProjections
              picks={picks}
              matchups={matchups}
              isLoading={picksLoading}
            />
          </div>
        </section>

        {/* Info Row: Trends | Injuries | Expert Picks */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <BettingTrendsCard
              trends={trends}
              matchups={matchups}
              isLoading={trendsLoading}
            />
            <InjuryReportsCard reports={injuries} isLoading={injuriesLoading} />
            <ExpertPicksCard
              picks={picks}
              matchups={matchups}
              isLoading={picksLoading}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}

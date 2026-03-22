import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import type { BettingTrend, Matchup } from "../backend";

interface Props {
  trends: BettingTrend[];
  matchups: Matchup[];
  isLoading: boolean;
}

const FALLBACK_TRENDS = [
  { away: "SF 49ers", home: "KC Chiefs", homePct: 67, awayPct: 33 },
  { away: "Denver Nuggets", home: "Boston Celtics", homePct: 54, awayPct: 46 },
  { away: "NY Yankees", home: "LA Dodgers", homePct: 72, awayPct: 28 },
];

export function BettingTrendsCard({ trends, matchups, isLoading }: Props) {
  const displayItems =
    trends.length > 0
      ? trends.slice(0, 5).map((t, i) => ({
          away: matchups[Number(t.matchup)]?.awayTeam || `Team A (${i + 1})`,
          home: matchups[Number(t.matchup)]?.homeTeam || `Team B (${i + 1})`,
          homePct: Math.round(t.homeBetPercentage),
          awayPct: Math.round(t.awayBetPercentage),
        }))
      : FALLBACK_TRENDS;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="card-gradient rounded-lg border border-border p-5 shadow-card"
      data-ocid="trends.panel"
    >
      <h3 className="text-base font-bold text-foreground mb-4">
        Betting Trends
      </h3>

      {isLoading ? (
        <div className="space-y-4">
          {["a", "b", "c"].map((k) => (
            <Skeleton key={k} className="h-14 w-full bg-secondary" />
          ))}
        </div>
      ) : (
        <div className="space-y-4" data-ocid="trends.list">
          {displayItems.map((item, i) => (
            <div
              key={`${item.home}-${item.away}`}
              data-ocid={`trends.item.${i + 1}`}
            >
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">{item.away}</span>
                <span className="text-muted-foreground">{item.home}</span>
              </div>
              <div className="relative h-5 rounded-full overflow-hidden bg-secondary">
                <div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    width: `${item.awayPct}%`,
                    background: "oklch(0.61 0.18 20)",
                    transition: "width 0.6s ease",
                  }}
                />
                <div
                  className="absolute right-0 top-0 h-full rounded-full"
                  style={{
                    width: `${item.homePct}%`,
                    background: "oklch(0.73 0.19 150)",
                    transition: "width 0.6s ease",
                  }}
                />
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-destructive font-semibold">
                  {item.awayPct}%
                </span>
                <span className="text-success font-semibold">
                  {item.homePct}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

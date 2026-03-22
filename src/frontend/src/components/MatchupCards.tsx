import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import type { Matchup } from "../backend";

const TEAM_COLOR = "oklch(0.55 0.2 255)";

function TeamBadge({ name }: { name: string }) {
  const initials = name.split(" ").slice(-1)[0].substring(0, 3).toUpperCase();
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black text-white"
      style={{
        background: `${TEAM_COLOR}33`,
        border: `2px solid ${TEAM_COLOR}66`,
      }}
    >
      {initials}
    </div>
  );
}

function OddsTable({
  odds,
}: {
  odds: Array<[string, { spread: number; total: number; moneyline: number }]>;
}) {
  const firstBook = odds[0];
  if (!firstBook) return null;
  const [, o] = firstBook;
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 text-xs mb-1">
        <span className="text-muted-foreground uppercase tracking-wider text-center">
          Spread
        </span>
        <span className="text-muted-foreground uppercase tracking-wider text-center">
          Total
        </span>
        <span className="text-muted-foreground uppercase tracking-wider text-center">
          ML
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm font-semibold">
        <span
          className={`text-center ${o.spread > 0 ? "text-success" : "text-destructive"}`}
        >
          {o.spread > 0 ? "+" : ""}
          {o.spread.toFixed(1)}
        </span>
        <span className="text-center text-foreground">
          {o.total.toFixed(1)}
        </span>
        <span
          className={`text-center ${o.moneyline > 0 ? "text-success" : "text-destructive"}`}
        >
          {o.moneyline > 0 ? "+" : ""}
          {o.moneyline}
        </span>
      </div>
    </div>
  );
}

function MatchupCardSkeleton() {
  return (
    <div className="card-gradient rounded-lg border border-border p-5">
      <Skeleton className="h-4 w-16 mb-4 bg-secondary" />
      <div className="flex items-center justify-between mb-5">
        <Skeleton className="w-12 h-12 rounded-full bg-secondary" />
        <Skeleton className="h-6 w-8 bg-secondary" />
        <Skeleton className="w-12 h-12 rounded-full bg-secondary" />
      </div>
      <Skeleton className="h-16 w-full bg-secondary mb-4" />
      <Skeleton className="h-9 w-full bg-secondary" />
    </div>
  );
}

const FALLBACK_MATCHUPS: Matchup[] = [
  {
    league: "NFL",
    homeTeam: "Kansas City Chiefs",
    awayTeam: "San Francisco 49ers",
    sportsbookOdds: [
      ["DraftKings", { spread: -3.5, total: 47.5, moneyline: -175 }],
    ],
  },
  {
    league: "NBA",
    homeTeam: "Boston Celtics",
    awayTeam: "Denver Nuggets",
    sportsbookOdds: [
      ["FanDuel", { spread: 2.5, total: 224.5, moneyline: 115 }],
    ],
  },
];

export function MatchupCards({
  matchups,
  isLoading,
}: { matchups: Matchup[]; isLoading: boolean }) {
  const displayMatchups =
    matchups.length >= 2 ? matchups.slice(0, 2) : FALLBACK_MATCHUPS;

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
      data-ocid="matchups.section"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {isLoading
          ? ["a", "b"].map((k) => <MatchupCardSkeleton key={k} />)
          : displayMatchups.map((matchup, idx) => (
              <motion.div
                key={`${matchup.league}-${matchup.homeTeam}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                data-ocid={`matchups.item.${idx + 1}`}
                className="card-gradient rounded-lg border border-border p-5 flex flex-col gap-4 shadow-card"
              >
                <div className="flex items-center justify-between">
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-xs font-bold tracking-wider">
                    {matchup.league}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Live</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center gap-1.5">
                    <TeamBadge name={matchup.awayTeam} />
                    <span className="text-xs font-semibold text-foreground text-center max-w-[80px] leading-tight">
                      {matchup.awayTeam}
                    </span>
                  </div>
                  <span className="text-xl font-black text-muted-foreground">
                    VS
                  </span>
                  <div className="flex flex-col items-center gap-1.5">
                    <TeamBadge name={matchup.homeTeam} />
                    <span className="text-xs font-semibold text-foreground text-center max-w-[80px] leading-tight">
                      {matchup.homeTeam}
                    </span>
                  </div>
                </div>

                <div className="bg-secondary/40 rounded-md p-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                    Current Odds
                  </p>
                  <OddsTable odds={matchup.sportsbookOdds} />
                </div>

                <Button
                  data-ocid={`matchups.item.${idx + 1}.primary_button`}
                  className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 font-semibold text-sm h-9"
                  variant="outline"
                >
                  View Deep Stats
                </Button>
              </motion.div>
            ))}
      </div>
    </section>
  );
}

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import type { Matchup } from "../backend";

interface Props {
  matchups: Matchup[];
  isLoading: boolean;
}

export function OddsComparison({ matchups, isLoading }: Props) {
  const sportsbooks = ["DraftKings", "FanDuel", "BetMGM", "Caesars"];

  // Gather all sportsbook odds from matchups
  const allBooks: Record<
    string,
    { spread: number; total: number; moneyline: number }
  > = {};
  if (matchups.length > 0) {
    for (const [book, odds] of matchups[0].sportsbookOdds) {
      allBooks[book] = odds;
    }
  }

  // Fallback data
  const fallbackBooks: Record<
    string,
    { spread: number; total: number; moneyline: number }
  > = {
    DraftKings: { spread: -3.5, total: 47.5, moneyline: -175 },
    FanDuel: { spread: -3.0, total: 47.0, moneyline: -168 },
    BetMGM: { spread: -3.5, total: 48.0, moneyline: -180 },
    Caesars: { spread: -4.0, total: 47.5, moneyline: -172 },
  };

  const displayBooks =
    Object.keys(allBooks).length > 0 ? allBooks : fallbackBooks;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="card-gradient rounded-lg border border-border p-5 shadow-card"
      data-ocid="odds.panel"
    >
      <h3 className="text-base font-bold text-foreground mb-4">
        Live Odds Comparison
      </h3>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-full bg-secondary" />
          ))}
        </div>
      ) : (
        <div>
          {/* Header */}
          <div className="grid grid-cols-4 gap-2 mb-2 px-1">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              Book
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold text-center">
              Spread
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold text-center">
              O/U
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold text-center">
              ML
            </span>
          </div>
          <Separator className="bg-border mb-3" />

          {sportsbooks.map((book, i) => {
            const odds = displayBooks[book] || {
              spread: -3.5,
              total: 47.5,
              moneyline: -175,
            };
            const isBest = i === 1;
            return (
              <div key={book}>
                <div
                  className={`grid grid-cols-4 gap-2 py-2.5 px-1 rounded-md transition-colors ${
                    isBest ? "bg-primary/5" : "hover:bg-secondary/30"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {isBest && (
                      <span className="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" />
                    )}
                    <span className="text-xs font-semibold text-foreground truncate">
                      {book}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold text-center ${
                      odds.spread > 0 ? "text-success" : "text-destructive"
                    }`}
                  >
                    {odds.spread > 0 ? "+" : ""}
                    {odds.spread.toFixed(1)}
                  </span>
                  <span className="text-xs font-semibold text-center text-foreground">
                    {odds.total.toFixed(1)}
                  </span>
                  <span
                    className={`text-xs font-semibold text-center ${
                      odds.moneyline > 0 ? "text-success" : "text-destructive"
                    }`}
                  >
                    {odds.moneyline > 0 ? "+" : ""}
                    {odds.moneyline}
                  </span>
                </div>
                {i < sportsbooks.length - 1 && (
                  <Separator className="bg-border/50" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

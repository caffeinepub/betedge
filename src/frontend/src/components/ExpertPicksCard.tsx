import { Skeleton } from "@/components/ui/skeleton";
import { Star, Trophy } from "lucide-react";
import { motion } from "motion/react";
import type { ExpertPick, Matchup } from "../backend";

const FALLBACK_PICKS: ExpertPick[] = [
  {
    pick: "Chiefs -3.5",
    reasoning:
      "KC's home dominance and Patrick Mahomes' clutch factor make this a strong cover play.",
    matchup: BigInt(0),
    confidencePercentage: 84,
  },
  {
    pick: "Over 224.5",
    reasoning: "Both squads rank top-5 in offensive efficiency this week.",
    matchup: BigInt(1),
    confidencePercentage: 71,
  },
  {
    pick: "49ers ML +155",
    reasoning:
      "Value alert: the market may be undervaluing SF's defensive scheme.",
    matchup: BigInt(0),
    confidencePercentage: 62,
  },
];

export function ExpertPicksCard({
  picks,
  matchups,
  isLoading,
}: { picks: ExpertPick[]; matchups: Matchup[]; isLoading: boolean }) {
  const displayPicks = picks.length > 0 ? picks : FALLBACK_PICKS;
  const topPick = displayPicks[0];
  const valuePicks = displayPicks.slice(1, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="card-gradient rounded-lg border border-border p-5 shadow-card"
      data-ocid="expertpicks.panel"
    >
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-4 h-4 text-yellow-400" />
        <h3 className="text-base font-bold text-foreground">
          Expert Pick Recommendations
        </h3>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-24 w-full bg-secondary" />
          {["a", "b", "c"].map((k) => (
            <Skeleton key={k} className="h-12 w-full bg-secondary" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {topPick && (
            <div className="rounded-md bg-primary/10 border border-primary/30 p-4 glow-blue">
              <div className="flex items-center gap-1.5 mb-2">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <span className="text-xs text-yellow-400 font-bold uppercase tracking-wider">
                  Pick of the Day
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-black text-foreground">
                  {topPick.pick}
                </span>
                <span className="text-success font-bold text-lg">
                  {topPick.confidencePercentage}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {topPick.reasoning}
              </p>
              {matchups[Number(topPick.matchup)] && (
                <p className="text-xs text-primary mt-1.5 font-semibold">
                  {matchups[Number(topPick.matchup)].awayTeam} @{" "}
                  {matchups[Number(topPick.matchup)].homeTeam}
                </p>
              )}
            </div>
          )}

          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">
              Top Value Plays
            </p>
            <div className="space-y-2" data-ocid="expertpicks.list">
              {valuePicks.map((pick, i) => (
                <div
                  key={pick.pick}
                  data-ocid={`expertpicks.item.${i + 1}`}
                  className="flex items-center justify-between p-2.5 rounded-md bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-foreground">
                      {pick.pick}
                    </span>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {pick.reasoning.substring(0, 50)}...
                    </p>
                  </div>
                  <span
                    className={`text-sm font-bold ml-3 flex-shrink-0 ${
                      pick.confidencePercentage >= 70
                        ? "text-success"
                        : pick.confidencePercentage >= 50
                          ? "text-yellow-400"
                          : "text-destructive"
                    }`}
                  >
                    {pick.confidencePercentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

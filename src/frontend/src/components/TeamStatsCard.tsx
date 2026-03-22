import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import type { Matchup, TeamStats } from "../backend";

const FORM_POSITIONS = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"];

function StatBar({
  label,
  value,
  max,
}: { label: string; value: number; max: number }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground font-semibold">
          {value.toFixed(1)}
        </span>
      </div>
      <div className="stat-bar-track">
        <div className="stat-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function FormChart({ form, prefix }: { form: number[]; prefix: string }) {
  const max = Math.max(...form, 1);
  return (
    <div className="flex items-end gap-1 h-12">
      {form.map((v, i) => (
        <div
          key={`${prefix}-${FORM_POSITIONS[i] ?? i}`}
          className="flex-1 rounded-sm"
          style={{
            height: `${(v / max) * 100}%`,
            background:
              v >= 0.5 ? "oklch(0.73 0.19 150)" : "oklch(0.61 0.18 20)",
            minHeight: "4px",
          }}
        />
      ))}
    </div>
  );
}

const FALLBACK_STATS: TeamStats[] = [
  {
    teamName: "Kansas City Chiefs",
    pointsPerGame: 27.4,
    yardsPerGame: 378.2,
    defenseRank: BigInt(3),
    recentForm: [1, 0.8, 1, 0.6, 1],
  },
  {
    teamName: "San Francisco 49ers",
    pointsPerGame: 24.8,
    yardsPerGame: 362.5,
    defenseRank: BigInt(6),
    recentForm: [0.7, 1, 0.5, 1, 0.8],
  },
];

export function TeamStatsCard({
  teamStats,
  matchups,
  isLoading,
}: { teamStats: TeamStats[]; matchups: Matchup[]; isLoading: boolean }) {
  const matchup = matchups[0];
  const homeStats =
    teamStats.find((t) => t.teamName === matchup?.homeTeam) ||
    FALLBACK_STATS[0];
  const awayStats =
    teamStats.find((t) => t.teamName === matchup?.awayTeam) ||
    FALLBACK_STATS[1];
  const displayMatchup = matchup || {
    homeTeam: "KC Chiefs",
    awayTeam: "SF 49ers",
    league: "NFL",
    sportsbookOdds: [],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card-gradient rounded-lg border border-border p-5 shadow-card"
      data-ocid="teamstats.panel"
    >
      <h3 className="text-base font-bold text-foreground mb-1">
        Team Stats & Insights
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        {displayMatchup.awayTeam} vs {displayMatchup.homeTeam}
      </p>

      {isLoading ? (
        <div className="space-y-4">
          {["a", "b", "c", "d"].map((k) => (
            <Skeleton key={k} className="h-8 w-full bg-secondary" />
          ))}
        </div>
      ) : (
        <>
          <div className="bg-secondary/30 rounded-md p-3 mb-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="text-foreground font-semibold">
                {displayMatchup.awayTeam}
              </span>{" "}
              enters with strong offensive momentum averaging{" "}
              <span className="text-success font-semibold">
                {awayStats.pointsPerGame.toFixed(1)} PPG
              </span>
              .{" "}
              <span className="text-foreground font-semibold">
                {displayMatchup.homeTeam}
              </span>{" "}
              counters with a top-{Number(homeStats.defenseRank)} defense.
            </p>
          </div>

          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">
            {displayMatchup.awayTeam}
          </p>
          <StatBar label="PPG" value={awayStats.pointsPerGame} max={40} />
          <StatBar label="YPG" value={awayStats.yardsPerGame} max={450} />

          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3 mt-4">
            {displayMatchup.homeTeam}
          </p>
          <StatBar label="PPG" value={homeStats.pointsPerGame} max={40} />
          <StatBar label="YPG" value={homeStats.yardsPerGame} max={450} />

          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2 mt-4">
            Recent Form
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {displayMatchup.awayTeam.split(" ").slice(-1)[0]}
              </p>
              <FormChart form={awayStats.recentForm} prefix="away" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {displayMatchup.homeTeam.split(" ").slice(-1)[0]}
              </p>
              <FormChart form={homeStats.recentForm} prefix="home" />
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Target, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { ExpertPick, Matchup } from "../backend";

interface Props {
  picks: ExpertPick[];
  matchups: Matchup[];
  isLoading: boolean;
}

function ConfidenceBar({ pct }: { pct: number }) {
  const color =
    pct >= 70
      ? "oklch(0.73 0.19 150)"
      : pct >= 50
        ? "oklch(0.75 0.15 55)"
        : "oklch(0.61 0.18 20)";
  return (
    <div className="stat-bar-track">
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          borderRadius: "3px",
          background: color,
          transition: "width 0.6s ease",
        }}
      />
    </div>
  );
}

const FALLBACK_PICKS: ExpertPick[] = [
  {
    pick: "Chiefs -3.5",
    reasoning:
      "KC's home field advantage and strong recent form give them the edge to cover the spread.",
    matchup: BigInt(0),
    confidencePercentage: 78,
  },
  {
    pick: "Over 47.5",
    reasoning:
      "Both offenses are in top form, expect a high-scoring contest with combined 50+ points.",
    matchup: BigInt(0),
    confidencePercentage: 65,
  },
  {
    pick: "49ers ML +155",
    reasoning:
      "Value in the underdog — SF's defense could keep this closer than the market suggests.",
    matchup: BigInt(1),
    confidencePercentage: 55,
  },
];

export function AIProjections({ picks, matchups, isLoading }: Props) {
  const [tab, setTab] = useState("spread");
  const allPicks = picks.length > 0 ? picks : FALLBACK_PICKS;
  const spreadPicks = allPicks.filter((_, i) => i % 2 === 0);
  const mlPicks = allPicks.filter((_, i) => i % 2 === 1);
  const displayMatchup = matchups[0];

  const renderPicks = (items: ExpertPick[]) => (
    <div className="space-y-4">
      {items.slice(0, 3).map((pick) => (
        <div key={pick.pick} className="bg-secondary/30 rounded-md p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-foreground">
              {pick.pick}
            </span>
            <span
              className={`text-xs font-bold ${
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
          <ConfidenceBar pct={pick.confidencePercentage} />
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            {pick.reasoning}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="card-gradient rounded-lg border border-border p-5 shadow-card"
      data-ocid="projections.panel"
    >
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-4 h-4 text-primary" />
        <h3 className="text-base font-bold text-foreground">AI Projections</h3>
      </div>

      {displayMatchup && (
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {displayMatchup.awayTeam} @ {displayMatchup.homeTeam}
          </span>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {["a", "b", "c"].map((k) => (
            <Skeleton key={k} className="h-20 w-full bg-secondary" />
          ))}
        </div>
      ) : (
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full bg-secondary/50 mb-4 h-8">
            <TabsTrigger
              value="spread"
              data-ocid="projections.spread.tab"
              className="flex-1 text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              Spread
            </TabsTrigger>
            <TabsTrigger
              value="ml"
              data-ocid="projections.ml.tab"
              className="flex-1 text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              Moneyline
            </TabsTrigger>
          </TabsList>
          <TabsContent value="spread">{renderPicks(spreadPicks)}</TabsContent>
          <TabsContent value="ml">
            {renderPicks(mlPicks.length > 0 ? mlPicks : spreadPicks)}
          </TabsContent>
        </Tabs>
      )}

      <div className="mt-4 flex items-center gap-2 p-2 rounded-md bg-primary/5 border border-primary/20">
        <TrendingUp className="w-3.5 h-3.5 text-primary flex-shrink-0" />
        <p className="text-xs text-muted-foreground">
          Predictions powered by machine learning models trained on historical
          data.
        </p>
      </div>
    </motion.div>
  );
}

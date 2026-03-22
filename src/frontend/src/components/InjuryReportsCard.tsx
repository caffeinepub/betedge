import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";
import { motion } from "motion/react";
import type { InjuryReport } from "../backend";

const STATUS_COLORS: Record<string, string> = {
  Out: "text-destructive bg-destructive/10 border-destructive/30",
  Doubtful: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  Questionable: "text-yellow-300 bg-yellow-300/10 border-yellow-300/30",
  Probable: "text-success bg-success/10 border-success/30",
  Active: "text-success bg-success/10 border-success/30",
};

const FALLBACK_REPORTS: InjuryReport[] = [
  {
    playerName: "Patrick Mahomes",
    team: "KC Chiefs",
    status: "Probable",
    impactAnalysis: "Minor ankle issue, expected to play at 90% capacity",
  },
  {
    playerName: "Christian McCaffrey",
    team: "SF 49ers",
    status: "Questionable",
    impactAnalysis: "Knee soreness — monitor practice reports",
  },
  {
    playerName: "Travis Kelce",
    team: "KC Chiefs",
    status: "Active",
    impactAnalysis: "No injury designation, full participant in practice",
  },
  {
    playerName: "Deebo Samuel",
    team: "SF 49ers",
    status: "Out",
    impactAnalysis: "Hamstring — ruled out for this week's game",
  },
];

export function InjuryReportsCard({
  reports,
  isLoading,
}: { reports: InjuryReport[]; isLoading: boolean }) {
  const displayReports =
    reports.length > 0 ? reports.slice(0, 6) : FALLBACK_REPORTS;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="card-gradient rounded-lg border border-border p-5 shadow-card"
      data-ocid="injuries.panel"
    >
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-4 h-4 text-yellow-400" />
        <h3 className="text-base font-bold text-foreground">
          Latest Injury Reports
        </h3>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {["a", "b", "c"].map((k) => (
            <Skeleton key={k} className="h-12 w-full bg-secondary" />
          ))}
        </div>
      ) : (
        <div className="space-y-2" data-ocid="injuries.list">
          {displayReports.map((report, i) => (
            <div
              key={report.playerName}
              data-ocid={`injuries.item.${i + 1}`}
              className="flex items-start gap-3 p-2.5 rounded-md hover:bg-secondary/30 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-foreground truncate">
                    {report.playerName}
                  </span>
                  <Badge
                    className={`text-xs px-2 py-0 h-5 flex-shrink-0 font-semibold border ${
                      STATUS_COLORS[report.status] ||
                      "text-muted-foreground bg-muted/20 border-muted/30"
                    }`}
                  >
                    {report.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {report.team}
                  </span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground truncate">
                    {report.impactAnalysis}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

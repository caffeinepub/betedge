import { useQuery } from "@tanstack/react-query";
import type {
  BettingTrend,
  ExpertPick,
  InjuryReport,
  Matchup,
  TeamStats,
} from "../backend";
import { useActor } from "./useActor";

export function useMatchups() {
  const { actor, isFetching } = useActor();
  return useQuery<Matchup[]>({
    queryKey: ["matchups"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMatchups();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTeamStats() {
  const { actor, isFetching } = useActor();
  return useQuery<TeamStats[]>({
    queryKey: ["teamStats"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTeamStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBettingTrends() {
  const { actor, isFetching } = useActor();
  return useQuery<BettingTrend[]>({
    queryKey: ["bettingTrends"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBettingTrends();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInjuryReports() {
  const { actor, isFetching } = useActor();
  return useQuery<InjuryReport[]>({
    queryKey: ["injuryReports"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInjuryReports();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useExpertPicks() {
  const { actor, isFetching } = useActor();
  return useQuery<ExpertPick[]>({
    queryKey: ["expertPicks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllExpertPicks();
    },
    enabled: !!actor && !isFetching,
  });
}

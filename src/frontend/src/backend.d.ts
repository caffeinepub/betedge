import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Odds {
    total: number;
    spread: number;
    moneyline: number;
}
export interface Matchup {
    homeTeam: string;
    league: string;
    awayTeam: string;
    sportsbookOdds: Array<[string, Odds]>;
}
export interface ExpertPick {
    pick: string;
    reasoning: string;
    matchup: bigint;
    confidencePercentage: number;
}
export interface BettingTrend {
    homeBetPercentage: number;
    matchup: bigint;
    awayBetPercentage: number;
}
export interface TeamStats {
    defenseRank: bigint;
    teamName: string;
    recentForm: Array<number>;
    yardsPerGame: number;
    pointsPerGame: number;
}
export interface InjuryReport {
    status: string;
    team: string;
    playerName: string;
    impactAnalysis: string;
}
export interface backendInterface {
    getAllBettingTrends(): Promise<Array<BettingTrend>>;
    getAllExpertPicks(): Promise<Array<ExpertPick>>;
    getAllInjuryReports(): Promise<Array<InjuryReport>>;
    getAllMatchups(): Promise<Array<Matchup>>;
    getAllTeamStats(): Promise<Array<TeamStats>>;
}

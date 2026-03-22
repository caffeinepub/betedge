import Array "mo:core/Array";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Text "mo:core/Text";

actor {
  type Odds = {
    spread : Float;
    total : Float;
    moneyline : Float;
  };

  type Matchup = {
    homeTeam : Text;
    awayTeam : Text;
    league : Text;
    sportsbookOdds : [(Text, Odds)];
  };

  type TeamStats = {
    teamName : Text;
    pointsPerGame : Float;
    yardsPerGame : Float;
    defenseRank : Nat;
    recentForm : [Float]; // Last 5 game point differentials
  };

  type BettingTrend = {
    matchup : Nat;
    homeBetPercentage : Float;
    awayBetPercentage : Float;
  };

  type InjuryReport = {
    playerName : Text;
    team : Text;
    status : Text;
    impactAnalysis : Text;
  };

  type ExpertPick = {
    matchup : Nat;
    pick : Text;
    confidencePercentage : Float;
    reasoning : Text;
  };

  // Comparison modules
  module Matchup {
    public func compare(a : Matchup, b : Matchup) : Order.Order {
      Text.compare(a.homeTeam, b.homeTeam);
    };
  };

  module TeamStats {
    public func compare(a : TeamStats, b : TeamStats) : Order.Order {
      Text.compare(a.teamName, b.teamName);
    };
  };

  module BettingTrend {
    public func compare(a : BettingTrend, b : BettingTrend) : Order.Order {
      if (a.matchup < b.matchup) {
        #less;
      } else if (a.matchup > b.matchup) {
        #greater;
      } else {
        #equal;
      };
    };
  };

  module InjuryReport {
    public func compare(a : InjuryReport, b : InjuryReport) : Order.Order {
      Text.compare(a.playerName, b.playerName);
    };
  };

  module ExpertPick {
    public func compare(a : ExpertPick, b : ExpertPick) : Order.Order {
      if (a.matchup < b.matchup) {
        #less;
      } else if (a.matchup > b.matchup) {
        #greater;
      } else {
        #equal;
      };
    };
  };

  // Storage
  let matchupsMap = Map.empty<Nat, Matchup>();
  let teamStatsMap = Map.empty<Text, TeamStats>();
  let bettingTrendsMap = Map.empty<Nat, BettingTrend>();
  let injuryReportsMap = Map.empty<Nat, InjuryReport>();
  let expertPicksMap = Map.empty<Nat, ExpertPick>();

  // Initialize sample data
  do {
    // Sample matchups
    let sampleMatchups = [
      (
        1,
        {
          homeTeam = "Kansas City Chiefs";
          awayTeam = "Buffalo Bills";
          league = "NFL";
          sportsbookOdds = [("DraftKings", { spread = -3.0; total = 56.5; moneyline = 1.65 })];
        },
      ),
      (
        2,
        {
          homeTeam = "Los Angeles Lakers";
          awayTeam = "Brooklyn Nets";
          league = "NBA";
          sportsbookOdds = [("FanDuel", { spread = -2.0; total = 232.0; moneyline = 1.9 })];
        },
      ),
    ];
    for ((id, matchup) in sampleMatchups.values()) {
      matchupsMap.add(id, matchup);
    };

    // Sample team stats
    let sampleStats = [
      {
        teamName = "Kansas City Chiefs";
        pointsPerGame = 29.6;
        yardsPerGame = 415.7;
        defenseRank = 14;
        recentForm = [3.0, -7.0, 14.0, 10.0, 7.0];
      },
      {
        teamName = "Buffalo Bills";
        pointsPerGame = 28.4;
        yardsPerGame = 396.4;
        defenseRank = 7;
        recentForm = [14.0, -3.0, 17.0, -10.0, 21.0];
      },
    ];
    for (stats in sampleStats.values()) {
      teamStatsMap.add(stats.teamName, stats);
    };

    // Sample betting trends
    let sampleTrends = [
      (
        1,
        {
          matchup = 1;
          homeBetPercentage = 61.2;
          awayBetPercentage = 38.8;
        },
      ),
      (
        2,
        {
          matchup = 2;
          homeBetPercentage = 54.5;
          awayBetPercentage = 45.5;
        },
      ),
    ];
    for ((id, trend) in sampleTrends.values()) {
      bettingTrendsMap.add(id, trend);
    };

    // Sample injury reports
    let sampleInjuries = [
      (
        1,
        {
          playerName = "Patrick Mahomes";
          team = "Kansas City Chiefs";
          status = "Questionable";
          impactAnalysis = "Significant impact if out, top QB in NFL";
        },
      ),
      (
        2,
        {
          playerName = "LeBron James";
          team = "Los Angeles Lakers";
          status = "Probable";
          impactAnalysis = "Minimal impact unless injury worsens";
        },
      ),
    ];
    for ((id, report) in sampleInjuries.values()) {
      injuryReportsMap.add(id, report);
    };

    // Sample expert picks
    let samplePicks = [
      (
        1,
        {
          matchup = 1;
          pick = "Chiefs -3";
          confidencePercentage = 72.5;
          reasoning = "Chiefs offense too strong at home, Bills defense struggles on the road.";
        },
      ),
      (
        2,
        {
          matchup = 2;
          pick = "Under 232.0";
          confidencePercentage = 66.8;
          reasoning = "High total, expect defensive intensity in marquee matchup.";
        },
      ),
    ];
    for ((id, pick) in samplePicks.values()) {
      expertPicksMap.add(id, pick);
    };
  };

  public query ({ caller }) func getAllMatchups() : async [Matchup] {
    matchupsMap.values().toArray().sort();
  };

  public query ({ caller }) func getAllTeamStats() : async [TeamStats] {
    teamStatsMap.values().toArray().sort();
  };

  public query ({ caller }) func getAllBettingTrends() : async [BettingTrend] {
    bettingTrendsMap.values().toArray().sort();
  };

  public query ({ caller }) func getAllInjuryReports() : async [InjuryReport] {
    injuryReportsMap.values().toArray().sort();
  };

  public query ({ caller }) func getAllExpertPicks() : async [ExpertPick] {
    expertPicksMap.values().toArray().sort();
  };
};

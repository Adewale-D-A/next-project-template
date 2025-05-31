export interface Match {
  _id: string;
  club_1: {
    _id: string;
    name: string;
    logo: string;
  };
  club_2: {
    _id: string;
    name: string;
    logo: string;
  };
  date: string;
  location: string;
}

export interface Fixtures {
  _id: string;
  club_1: {
    _id: string;
    name: string;
    logo: string;
  };
  club_2: {
    _id: string;
    name: string;
    logo: string;
  };
  date: string;
  location: string;
  status: string;
  league: string;
  score: {
    club_1: number;
    club_2: number;
  };
  isFormationSet: boolean;
}

export interface MatchInfo {
  date: string;
  time: string;
  location: string;
  fulltime: number;
  club_1: {
    _id: string;
    name: string;
    score: number;
  };
  club_2: {
    _id: string;
    name: string;
    score: number;
  };
}

export interface MatchSummary {
  _id: string;
  minute: string;
  team: string;
  team_id: string;
  player: string;
  action?: MatchSummaryActions;
  score: string;
}

export type MatchSummaryActions = "score" | "red-card" | "yellow-card" | string;

export interface MatchLineup {
  team_1: {
    team: string;
    team_id: string;
    keeper: {
      count: number;
      details: {
        name: string;
        position: string;
        jerseyNumber: number;
        isSubstituted: boolean;
        isYellowCard: boolean;
        isRedCard: boolean;
        isGoal: boolean;
      }[];
    };
    defenders: {
      count: number;
      details: {
        name: string;
        position: string;
        jerseyNumber: number;
        isSubstituted: boolean;
        isYellowCard: boolean;
        isRedCard: boolean;
        isGoal: boolean;
      }[];
    };
    mid_fielders: {
      count: number;
      details: {
        name: string;
        position: string;
        jerseyNumber: number;
        isSubstituted: boolean;
        isYellowCard: boolean;
        isRedCard: boolean;
        isGoal: boolean;
      }[];
    };
    forwards: {
      count: number;
      details: {
        name: string;
        position: string;
        jerseyNumber: number;
        isSubstituted: boolean;
        isYellowCard: boolean;
        isRedCard: boolean;
        isGoal: boolean;
      }[];
    };
  };
  team_2: {
    team: string;
    team_id: string;
    keeper: {
      count: number;
      details: {
        name: string;
        position: string;
        jerseyNumber: number;
        isSubstituted: boolean;
        isYellowCard: boolean;
        isRedCard: boolean;
        isGoal: boolean;
      }[];
    };
    defenders: {
      count: number;
      details: {
        name: string;
        position: string;
        jerseyNumber: number;
        isSubstituted: boolean;
        isYellowCard: boolean;
        isRedCard: boolean;
        isGoal: boolean;
      }[];
    };
    mid_fielders: {
      count: number;
      details: {
        name: string;
        position: string;
        jerseyNumber: number;
        isSubstituted: boolean;
        isYellowCard: boolean;
        isRedCard: boolean;
        isGoal: boolean;
      }[];
    };
    forwards: {
      count: number;
      details: {
        name: string;
        position: string;
        jerseyNumber: number;
        isSubstituted: boolean;
        isYellowCard: boolean;
        isRedCard: boolean;
        isGoal: boolean;
      }[];
    };
  };
}

export interface MatchLineupSubstitutions {
  team_1: {
    team: string;
    team_id: string;
    substitutions: {
      minute: string;
      outgoing: string;
      incoming: string;
    }[];
  };
  team_2: {
    team: string;
    team_id: string;
    substitutions: {
      minute: string;
      outgoing: string;
      incoming: string;
    }[];
  };
}

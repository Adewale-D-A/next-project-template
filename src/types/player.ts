export interface Player {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  preferredFoot: string;
  height: number;
  weight: number;
  position: string;
  jerseyNumber: number;
  startDate: string;
  ability: number;
  status: string;
  appearance: number;
  cleanshots: number;
  play_time: number;
  goals: number;
  assist: number;
  distance: number;
  speed: number;
  added: string;
  last_activity: string;
  profile_img?: string;
  competition_stats: {
    competition_id: string;
    name: string;
    appearance: number;
    goals_scored: number;
    play_time: number;
    fouls: number;
  }[];
}

export interface PlayerInMatch {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  preferredFoot: string;
  height: number;
  weight: number;
  position: string;
  jerseyNumber: number;
  startDate: string;
  ability: number;
  status: string;
  cleanshots: number;
  play_time: number;
  goals: number;
  assist: number;
  distance: number;
  no_of_passes: number;
  fouls: number;
  added: string;
  last_activity: string;
  profile_img?: string;
}
export interface PlayerLinupRepresentation {
  name: string;
  position: string;
  jerseyNumber: number;
  isSubstituted: boolean;
  isYellowCard: boolean;
  isRedCard: boolean;
  isGoal: boolean;
}

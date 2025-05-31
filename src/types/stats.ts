export interface TeamStats {
  _id: string;
  name: string;
  wins: {
    percentage: number;
    count: number;
  };
  goals_scored: number;
  goals_conceded: number;
  injuries: number;
  games_count: number;
}

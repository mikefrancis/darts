const API_BASE_URL = "https://api.dartcounter.net";

interface Match {
  clips: [];
  cpu_level: null;
  created_at: string;
  darts_thrown: null;
  enable_sudden_death: number;
  end_with: string;
  finished_at: string;
  game: {
    id: number;
    old_id: null;
    mode_type: string;
    mode_id: number;
    real_players: number;
  };
  goal_amount: number;
  has_camera: number;
  has_checkout_rate: boolean;
  has_sets: number;
  has_teams: number;
  id: number;
  is_best_of: number;
  is_online: number;
  labels: [];
  name: string;
  pivot: {
    user_id: number;
    match_id: number;
    name: string;
    started_at: string;
  };
  start_score: number;
  start_with: string;
  started_at: string;
  teams: [];
  total_score: null;
  tournament_game: null;
  two_legs_difference: number;
  updated_at: string;
  users: {
    three_dart_average: number | null;
    user: {
      id: number;
      full_name: string;
    };
  }[];
}

interface MatchesResponse {
  current_page: number;
  data: Match[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export async function getMatches() {
  const response = await fetch(`${API_BASE_URL}/matches`, {
    headers: {
      Authorization: `Bearer ${process.env.DARTCOUNTER_ACCESS_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch matches");
  }

  const data: MatchesResponse = await response.json();

  return data.data;
}

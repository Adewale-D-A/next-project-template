export interface AuthUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "club" | "scout";
  created_at?: string;
  updated_at?: string;
  role_id: 1 | 2;
}

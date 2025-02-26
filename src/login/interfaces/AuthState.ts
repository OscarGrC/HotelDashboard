import { AuthUser } from "./AuthUser";

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser;
  token: String;
}
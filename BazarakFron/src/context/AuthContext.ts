import { createContext } from "react";
import type { AuthContextType } from "./AuthTypes";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {}
});

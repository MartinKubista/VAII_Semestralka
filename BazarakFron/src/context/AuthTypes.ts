export interface MyTokenPayload {
  id_user: number;
  email: string;
  name: string;
  role: "admin" | "user"
}

export interface AuthContextType {
  user: MyTokenPayload | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface MyTokenPayload {
  id_user: number;
  email: string;
  name: string;
}

interface AuthContextType {
  user: MyTokenPayload | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<MyTokenPayload | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const decoded = jwtDecode<MyTokenPayload>(savedToken);
        setToken(savedToken);
        setUser(decoded);
        setIsLoggedIn(true);
      } catch {
        logout();
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);

    const decoded = jwtDecode<MyTokenPayload>(token);
    console.log(decoded);
    setUser({
      id_user: decoded.id_user,
      email: decoded.email,
      name: decoded.name
    });

    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
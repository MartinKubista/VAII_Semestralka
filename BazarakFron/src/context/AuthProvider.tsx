import { useState } from "react";
import type { PropsWithChildren } from "react";
import { jwtDecode } from "jwt-decode";

import { AuthContext } from "./AuthContext";
import type { MyTokenPayload } from "./AuthTypes";

export const AuthProvider = ({ children }: PropsWithChildren) => {

  const [authState, setAuthState] = useState(() => {
    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      return { user: null, token: null, isLoggedIn: false };
    }

    try {
      const decoded = jwtDecode<MyTokenPayload>(savedToken);
      return {
        user: decoded,
        token: savedToken,
        isLoggedIn: true,
      };
    } catch {
      localStorage.removeItem("token");
      return { user: null, token: null, isLoggedIn: false };
    }
  });

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({
      user: null,
      token: null,
      isLoggedIn: false
    });
  };

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode<MyTokenPayload>(token);

    setAuthState({
      user: {
        id_user: decoded.id_user,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role
      },
      token,
      isLoggedIn: true,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        token: authState.token,
        isLoggedIn: authState.isLoggedIn,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
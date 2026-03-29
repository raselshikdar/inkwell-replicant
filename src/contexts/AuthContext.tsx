import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  avatar: string;
  initials: string;
  joinedAt: string;
  location: string;
  website: string;
  github: string;
  twitter: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const mockUser: User = {
  id: "u1",
  name: "Guest User",
  username: "guestuser",
  email: "guest@example.com",
  bio: "Full-stack developer passionate about open source and writing.",
  avatar: "",
  initials: "GU",
  joinedAt: "2025-06-15",
  location: "San Francisco, CA",
  website: "https://example.com",
  github: "guestuser",
  twitter: "guestuser",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (_email: string, _password: string) => {
    // Mock login — will be replaced with real backend
    setUser(mockUser);
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    setUser({
      ...mockUser,
      name,
      email,
      username: name.toLowerCase().replace(/\s+/g, ""),
      initials: name.split(" ").map((n) => n[0]).join("").toUpperCase(),
    });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// acts as the blueprint for the AuthContext

import { createContext } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

// include in context: user object, logout function
interface AuthContextType {
  user: null | User;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export type { User, AuthContextType };

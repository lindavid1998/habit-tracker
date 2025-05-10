/* this is the component that will provide the value of auth context to its children
it implements the interface defined in AuthContext.tsx */

import React, { useState, useEffect } from 'react';
import { AuthContext, User, AuthContextType } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/auth/logout', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);
      if (response.ok) {
        setUser(null);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    /* when component mounts, ping backend and provide cookie
    wait for response
    if response ok, set user
    set loading to false */
    const fetchUser = async (): Promise<void> => {
      try {
        const response = await fetch('http://localhost:3000/auth/me', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const value: AuthContextType = {
    user,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../services/storage';
import { setUnauthorizedHandler } from '../api/client';
import { TOKEN_KEY, USER_KEY } from './storageKeys';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const [storedToken, storedUser] = await Promise.all([
          storage.get(TOKEN_KEY),
          storage.get(USER_KEY),
        ]);
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch {
        // sessão inválida/corrompida — segue para a tela de login
      } finally {
        setLoading(false);
      }
    }
    restoreSession();
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(signOut);
    return () => setUnauthorizedHandler(null);
  }, []);

  async function signIn(userData, authToken) {
    await Promise.all([
      storage.set(TOKEN_KEY, authToken),
      storage.set(USER_KEY, JSON.stringify(userData)),
    ]);
    setToken(authToken);
    setUser(userData);
  }

  async function signOut() {
    await Promise.all([
      storage.remove(TOKEN_KEY),
      storage.remove(USER_KEY),
    ]);
    setToken(null);
    setUser(null);
  }

  async function updateUser(patch) {
    const updatedUser = { ...user, ...patch };
    await storage.set(USER_KEY, JSON.stringify(updatedUser));
    setUser(updatedUser);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('ai_travel_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('ai_travel_token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auto Login / Token verification on mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const storedToken = localStorage.getItem('ai_travel_token');
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/me');
        const userData = response.data?.user || response.data?.data?.user || response.data?.data;
        if (userData) {
          setUser(userData);
          localStorage.setItem('ai_travel_user', JSON.stringify(userData));
        }
      } catch (err) {
        console.warn('Auto-login check failed:', err.message);
        // If unauthorized or error, clear token
        if (err.response?.status === 401) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('ai_travel_token', token);
    } else {
      localStorage.removeItem('ai_travel_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('ai_travel_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ai_travel_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', { email, password });
      const newToken = response.data.access_token;
      const userData = response.data.user;

      if (!newToken || !userData) {
        throw new Error('Invalid response from server');
      }

      setToken(newToken);
      setUser(userData);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || err.message || 'Login failed';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (fullName, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/register', { name: fullName, email, password });
      const newToken = response.data.access_token;
      const userData = response.data.user;

      if (!newToken || !userData) {
        throw new Error('Invalid response from server');
      }

      setToken(newToken);
      setUser(userData);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || err.message || 'Registration failed';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ai_travel_token');
    localStorage.removeItem('ai_travel_user');
  };

  const updateProfile = (updatedData) => {
    setUser((prev) => ({
      ...prev,
      ...updatedData
    }));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

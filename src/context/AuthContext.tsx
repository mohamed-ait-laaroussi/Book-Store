import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('bookstore_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data', error);
        localStorage.removeItem('bookstore_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo login logic - in a real app, this would be an API request
      if (email === 'demo@example.com' && password === 'password') {
        const userData: User = {
          id: '1',
          email: 'demo@example.com',
          name: 'Demo User'
        };
        setUser(userData);
        localStorage.setItem('bookstore_user', JSON.stringify(userData));
        toast.success('Successfully signed in');
        return;
      }
      
      toast.error('Invalid email or password');
    } catch (error) {
      toast.error('Failed to sign in');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo signup logic - in a real app, this would be an API request
      const userData: User = {
        id: Date.now().toString(),
        email,
        name
      };
      setUser(userData);
      localStorage.setItem('bookstore_user', JSON.stringify(userData));
      toast.success('Account created successfully');
    } catch (error) {
      toast.error('Failed to create account');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bookstore_user');
    toast.success('Signed out successfully');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
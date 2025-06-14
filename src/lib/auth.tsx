'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  lastVisitedPage: string | null;
  setLastVisitedPage: (page: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastVisitedPage, setLastVisitedPage] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  
  // Initialize auth state from localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedLastPage = localStorage.getItem('lastVisitedPage');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    if (storedLastPage && storedLastPage !== '/') {
      setLastVisitedPage(storedLastPage);
    }
  }, []);

  // Update last visited page when pathname changes
  useEffect(() => {
    if (isAuthenticated && pathname && pathname !== '/') {
      setLastVisitedPage(pathname);
      localStorage.setItem('lastVisitedPage', pathname);
    }
  }, [pathname, isAuthenticated]);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call to authenticate
    // For demo purposes, we'll just simulate a successful login
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        // Set the cookie for middleware
        document.cookie = 'isAuthenticated=true; path=/';
        // Redirecionar SEMPRE para o dashboard após o login bem-sucedido
        router.push('/dashboard');
        resolve(true);
      }, 1000);
    });
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    // Remove the cookie
    document.cookie = 'isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/');
  };
  
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        lastVisitedPage,
        setLastVisitedPage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

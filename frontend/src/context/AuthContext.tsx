import React, { createContext,  useEffect, useState, type ReactNode } from 'react';
import type { AuthContextType } from '../interfaces/authContext.interface';


  
 export const AuthContext = createContext<AuthContextType | undefined>(undefined);

  export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
      }
    }, []);
    
    const login = (token:string) => {
      setIsAuthenticated(true);
      localStorage.setItem('token', token);
    };
  
    const logout = () => {
      setIsAuthenticated(false);
      localStorage.removeItem('token'); 
    };
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children} 
      </AuthContext.Provider>
    );
  };



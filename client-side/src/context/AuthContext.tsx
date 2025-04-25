import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, {
        withCredentials: true
      })
      setUser(response.data.data);
    } catch (error) {
      console.log("Erron in Fetching User Details: ", error);
      setUser(null)
    } 
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, credentials,
        { withCredentials: true }
      )
      await checkAuth();

      // Successful Login
      localStorage.setItem("userName", response.data.user.name);

    } catch (error) {
      console.log("Login Error: ", error);
    }
  }

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, { 
        withCredentials: true 
      });
      
      // Clear client-side storage
      localStorage.removeItem("userName");

      setUser(null);
      
      navigate('/');

    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      logout, 
      checkAuth, 
      login,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
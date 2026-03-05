// context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../helper/config";
import { toast } from "react-toastify";
import LoadingPage from "../components/Loading";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check user persistence on App load / reload
  useEffect(() => {
    const fetchLoggedUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/auth/logged-user`, {
          withCredentials: true,
        });

        if (response.data.success && response.data.data) {
          console.log("Logged user response:", response.data);
          setUser(response.data.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.log("No active session found", err);
        setUser(null);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoggedUser();
  }, []);

  // Login user manually (example: after login API)
  const loginUser = (userData) => {
    setUser(userData);
  };

 

  const logoutUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Logged out successfully");
      }
    } catch (err) {
      console.error("Logout failed", err);
      toast.error("Logout failed. Please try again.");
    } finally {
      setUser(null); // Frontend state clear
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        error,
        loginUser,
        logoutUser,
      }}
    >
      {!loading ? (
        children
      ) : (
        <div className="flex h-screen items-center justify-center text-lg font-medium">
         <LoadingPage />
        </div>
      )}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

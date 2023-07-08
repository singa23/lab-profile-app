import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();
const API_URL = 'http://localhost:5005';

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem('token', token);
  };

  const authenticateUser = () => {
    const token = localStorage.getItem('token');
    if (storeToken) {
      axios
        .get(`${API_URL}/auth/me`)
        .then((response) => {
          const user = response.data;
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };
  const removeToken = () => {
    localStorage.removeItem('token');
  };
  const logoutUser = () => {
    removeToken();
    authenticateUser();
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        authenticateUser,
        logoutUser,
        storeToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProviderWrapper;
export { AuthContext };

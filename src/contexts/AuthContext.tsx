import React, { createContext, useReducer } from 'react';
import { LOGIN, LOGOUT } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';
import { AuthProps, AuthContextType } from 'types/auth';

const initialState: AuthProps = {
  isLoggedIn: false,
  user: null
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const logout = () => {
    dispatch({
      type: LOGOUT
    });
  };

  const login = (email: string, password: string) => {
    if (email === 'stef@gmail.com' && password === '123') {
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user: {
            id: '123',
            email: email,
            name: 'Stefan Bura',
            role: 'Frontend Engineer'
          }
        }
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

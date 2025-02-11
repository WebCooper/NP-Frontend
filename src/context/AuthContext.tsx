import React, { ReactNode, createContext, useReducer, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Define types
type User = {
  id: string;
  name: string;
} | null;

type AuthState = {
  user: User;
  token: string | null;
};

type AuthAction =
    | { type: "LOGIN_START" }
    | { type: "LOGIN_SUCCESS"; payload: { user: User; token: string } }
    | { type: "LOGOUT" };

// Public routes that don’t require authentication
const PUBLIC_ROUTES = ["/login", "/register", "/"];

const getStoredUser = (): User => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  user: getStoredUser(),
  token: localStorage.getItem("token"),
};

// Create auth context
export const authContext = createContext<{
  user: User;
  token: string | null;
  dispatch: React.Dispatch<AuthAction>;
}>({
  user: null,
  token: null,
  dispatch: () => {},
});

// Auth Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state };
    case "LOGIN_SUCCESS":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      return { user: action.payload.user, token: action.payload.token };
    case "LOGOUT":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return { user: null, token: null };
    default:
      return state;
  }
};

// Auth Provider
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle route protection
  React.useEffect(() => {
    const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);
    const isAuthenticated = !!state.token;

    if (!isAuthenticated && !isPublicRoute) {
      navigate("/login");
    }

    if (isAuthenticated && location.pathname === "/login") {
      navigate("/home");
    }
  }, [state.token, location, navigate]);

  return (
      <authContext.Provider value={{ ...state, dispatch }}>
        {children}
      </authContext.Provider>
  );
};

// Custom hook for consuming auth context
export const useAuth = () => {
  return useContext(authContext);
};

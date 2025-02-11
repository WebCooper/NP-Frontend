import { ReactNode, createContext, useEffect, useReducer , useContext} from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Define types for the user and auth state
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

// Array of public routes that don't require authentication
const PUBLIC_ROUTES = ['/login', '/register', '/']; 

const getStoredUser = (): User => {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) return null;
  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  user: getStoredUser(),
  token: localStorage.getItem('token') || null
};

export const authContext = createContext<{
  user: User;
  token: string | null;
  dispatch: React.Dispatch<AuthAction>;
}>({
  ...initialState,
  dispatch: () => undefined,
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        token: null
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return {
        user: null,
        token: null
      };
    default:
      return state;
  }
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle localStorage synchronization
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }

    if (state.token) {
      localStorage.setItem('token', state.token);
    } else {
      localStorage.removeItem('token');
    }
  }, [state]);

  // Handle route protection
  useEffect(() => {
    const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);
    const isAuthenticated = !!(state.user && state.token);

    if (!isAuthenticated && !isPublicRoute) {
      // Redirect to login only if trying to access protected route without auth
      navigate('/login');
    }
    
    if (isAuthenticated && location.pathname === '/login') {
      // Redirect to home if trying to access login while authenticated
      navigate('/home');
    }
  }, [state.user, state.token, navigate, location]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        dispatch
      }}
    >
      {children}
    </authContext.Provider>
  );
};

// Custom hook for easier context usage
export const useAuth = () => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
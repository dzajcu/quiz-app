import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import AuthService from "@/services/auth.service";
import { RegisterData, LoginData } from "@/services/auth.service";

interface User {
    id: string;
    username: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (userData: LoginData) => Promise<void>;
    register: (userData: RegisterData) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const user = AuthService.getCurrentUser();
                if (user) {
                    setUser(user);
                }
            } catch (error) {
                console.error("Failed to initialize auth:", error);
                AuthService.logout();
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (userData: LoginData) => {
        setIsLoading(true);
        try {
            const response = await AuthService.login(userData);
            AuthService.saveAuthData(response);
            setUser(response.user);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (userData: RegisterData) => {
        setIsLoading(true);
        try {
            const response = await AuthService.register(userData);
            AuthService.saveAuthData(response);
            setUser(response.user);
        } finally {
            setIsLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        AuthService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

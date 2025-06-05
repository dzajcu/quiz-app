import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "@/services/auth.service";
import { RegisterData, LoginData } from "@/services/auth.service";
import { setNavigator } from "@/services/api";
import { toast } from "sonner";

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
    const navigate = useNavigate();

    useEffect(() => {
        setNavigator(navigate);
    }, [navigate]);
    useEffect(() => {
        const initAuth = async () => {
            try {
                const user = await AuthService.getCurrentUser();
                setUser(user);
            } catch (error) {
                console.error("Failed to initialize auth:", error);
                AuthService.logout(navigate);
                toast.error("Session expired. Please log in again.");
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, [navigate]);

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
    const logout = () => {
        AuthService.logout(navigate);
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

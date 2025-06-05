import api from "./api";
import Cookies from "js-cookie";

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    expiresIn: number;
    user: {
        id: string;
        username: string;
        email: string;
        role: string;
    };
    message: string;
}

export type NavigateCallback = (path: string) => void;

const AuthService = {
    register: async (userData: RegisterData): Promise<AuthResponse> => {
        const response = await api.post("/users/register", userData);
        return response.data;
    },

    login: async (userData: LoginData): Promise<AuthResponse> => {
        const response = await api.post("/users/login", userData);
        return response.data;
    },
    logout: (navigate?: NavigateCallback): void => {
        Cookies.remove("token");

        if (navigate) {
            navigate("/login");
        }
    },
    getCurrentUser: async () => {
        const token = Cookies.get("token");
        if (!token) {
            throw new Error("No token found");
        }

        try {
            const response = await api.get("/users/profile");
            return response.data.user;
        } catch (error) {
            console.error("Error fetching current user:", error);
            throw error;
        }
    },

    saveAuthData: (data: AuthResponse): void => {
        Cookies.set("token", data.token, {
            expires: data.expiresIn,
            secure: true,
            sameSite: "strict",
        });
    },
};

export default AuthService;

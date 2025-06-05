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
        Cookies.remove("user");

        if (navigate) {
            navigate("/login");
        }
    },

    getCurrentUser: () => {
        const userStr = Cookies.get("user");
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    },

    saveAuthData: (data: AuthResponse): void => {
        Cookies.set("token", data.token, {
            expires: 1,
            secure: true,
            sameSite: "strict",
        });
        Cookies.set("user", JSON.stringify(data.user), {
            expires: 1,
            secure: true,
            sameSite: "strict",
        });
    },
};

export default AuthService;

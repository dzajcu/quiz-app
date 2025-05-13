import api from "./api";

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

const AuthService = {
    register: async (userData: RegisterData): Promise<AuthResponse> => {
        const response = await api.post("/users/register", userData);
        return response.data;
    },

    login: async (userData: LoginData): Promise<AuthResponse> => {
        const response = await api.post("/users/login", userData);
        return response.data;
    },

    logout: (): void => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    },

    saveAuthData: (data: AuthResponse): void => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
    },
};

export default AuthService;

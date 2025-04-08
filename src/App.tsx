import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import SidebarWrapper from "./components/sidebar-wrapper.tsx";
import Quiz from "./pages/Quiz/Quiz.tsx";
import QuizMenu from "./pages/Quiz/QuizMenu.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { QuizProvider } from "@/contexts/QuizContext";
import LoginForm from "./pages/authentication/loginForm.tsx";
import RegisterForm from "./pages/authentication/registerForm.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ThemeProvider
                defaultTheme={
                    window.matchMedia("(prefers-color-scheme: dark)").matches
                        ? "dark"
                        : "light"
                }
                storageKey="vite-ui-theme"
            >
                <Toaster richColors />
                <Navigate
                    to="/login"
                    replace
                />
            </ThemeProvider>
        ),
    },
    {
        path: "/login",
        element: (
            <ThemeProvider
                defaultTheme={
                    window.matchMedia("(prefers-color-scheme: dark)").matches
                        ? "dark"
                        : "light"
                }
                storageKey="vite-ui-theme"
            >
                <LoginForm />
            </ThemeProvider>
        ),
    },
    {
        path: "/register",
        element: (
            <ThemeProvider
                defaultTheme={
                    window.matchMedia("(prefers-color-scheme: dark)").matches
                        ? "dark"
                        : "light"
                }
                storageKey="vite-ui-theme"
            >
                <RegisterForm />
            </ThemeProvider>
        ),
    },
    {
        path: "/quiz",
        element: (
            <ThemeProvider
                defaultTheme={
                    window.matchMedia("(prefers-color-scheme: dark)").matches
                        ? "dark"
                        : "light"
                }
                storageKey="vite-ui-theme"
            >
                <Toaster richColors />
                <SidebarWrapper>
                    <QuizProvider>
                        <QuizMenu />
                    </QuizProvider>
                </SidebarWrapper>
            </ThemeProvider>
        ),
    },
    {
        path: "/quiz/:quizId",
        element: (
            <ThemeProvider
                defaultTheme={
                    window.matchMedia("(prefers-color-scheme: dark)").matches
                        ? "dark"
                        : "light"
                }
                storageKey="vite-ui-theme"
            >
                <Toaster richColors />
                <SidebarWrapper>
                    <Quiz />
                </SidebarWrapper>
            </ThemeProvider>
        ),
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;

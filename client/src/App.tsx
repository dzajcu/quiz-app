import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import SidebarWrapper from "./components/sidebar-wrapper.tsx";
import Quiz from "./pages/Quiz/Quiz.tsx";
import QuizMenu from "./pages/Quiz/QuizMenu.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { QuizProvider } from "@/contexts/QuizContext";
import LoginForm from "./pages/authentication/loginForm.tsx";
import RegisterForm from "./pages/authentication/registerForm.tsx";
import { AutoFillGrid } from "./components/autofill-grid";
import HomePageCard from "./pages/Quiz/components/HomePageCard.tsx";

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
                <SidebarWrapper>
                    <AutoFillGrid>
                        <HomePageCard
                            title="Classic Quiz"
                            description="Test your knowledge with classic quiz format"
                            id="classic"
                        />
                        <HomePageCard
                            title="Time Attack"
                            description="Race against the clock to answer questions"
                            id="time"
                        />
                        <HomePageCard
                            title="Challenge Mode"
                            description="Complete increasingly difficult questions"
                            id="challenge"
                        />
                        <HomePageCard
                            title="Daily Quiz"
                            description="New questions every day"
                            id="daily"
                        />
                        <HomePageCard
                            title="Multiplayer"
                            description="Compete with other players in real-time"
                            id="multiplayer"
                        />
                        <HomePageCard
                            title="Multiplayer"
                            description="Compete with other players in real-time"
                            id="multiplayer"
                        />
                        <HomePageCard
                            title="Multiplayer"
                            description="Compete with other players in real-time"
                            id="multiplayer"
                        />
                    </AutoFillGrid>
                </SidebarWrapper>
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

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SidebarWrapper from "./components/sidebar-wrapper.tsx";
import Quiz from "./pages/Quiz/Quiz.tsx";
import QuizMenu from "./pages/Quiz/QuizMenu.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { QuizProvider } from "@/contexts/QuizContext";
import LoginForm from "./pages/authentication/loginForm.tsx";
import RegisterForm from "./pages/authentication/registerForm.tsx";
import ProfilePage from "./pages/authentication/profile.tsx";
import { AutoFillGrid } from "./components/autofill-grid";
import HomePageCard from "./pages/Quiz/components/HomePageCard.tsx";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/protected-route.tsx";

const RootLayout = () => {
    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    return (
        <ThemeProvider
            defaultTheme={prefersDark ? "dark" : "light"}
            storageKey="vite-ui-theme"
        >
            <AuthProvider>
                <Toaster richColors />
                <Outlet />
            </AuthProvider>
        </ThemeProvider>
    );
};

const ProtectedLayout = () => (
    <ProtectedRoute>
        <Outlet />
    </ProtectedRoute>
);

const HomePage = () => (
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
);

const QuizLayout = () => (
    <SidebarWrapper>
        <Outlet />
    </SidebarWrapper>
);

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/login",
                element: <LoginForm />,
            },
            {
                path: "/register",
                element: <RegisterForm />,
            },
            {
                element: <ProtectedLayout />,
                children: [
                    {
                        path: "/profile",
                        element: <ProfilePage />,
                    },
                    {
                        element: <QuizLayout />,
                        children: [
                            {
                                path: "/quiz",
                                element: (
                                    <QuizProvider>
                                        <QuizMenu />
                                    </QuizProvider>
                                ),
                            },
                            {
                                path: "/quiz/:quizId",
                                element: <Quiz />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;

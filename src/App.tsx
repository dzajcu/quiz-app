import { BrowserRouter, Route, Routes } from "react-router-dom";
import SidebarWrapper from "./components/sidebar-wrapper.tsx";
import Quiz from "./pages/Quiz/Quiz.tsx";
import QuizMenu from "./pages/Quiz/QuizMenu.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { QuizProvider } from "@/contexts/QuizContext";

function App() {
    // Sprawdzenie, czy systemowy motyw to "dark" czy "light"
    const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;
    const defaultTheme = systemPrefersDark ? "dark" : "light";

    return (
        <ThemeProvider
            defaultTheme={defaultTheme} // Ustawienie domyślnego motywu zgodnie z systemem
            storageKey="vite-ui-theme"
        >
            <Toaster richColors />
            <BrowserRouter>
                <SidebarWrapper>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <QuizProvider>
                                    <QuizMenu />
                                </QuizProvider>
                            }
                        />
                        <Route
                            path="/quiz"
                            element={<Quiz />}
                        />
                    </Routes>
                </SidebarWrapper>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;

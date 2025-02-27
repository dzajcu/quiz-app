import Page from "./pages/Page.tsx";
import QuizPage from "./pages/QuizPage.tsx";

import { ThemeProvider } from "@/components/theme-provider";

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
            <Page>
                <QuizPage />
            </Page>
        </ThemeProvider>
    );
}

export default App;

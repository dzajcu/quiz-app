import { Header } from "./components/Header";
import { ModeButtons } from "./components/ModeButtons";
import { Flashcard } from "./components/flashcards/Flashcard.jsx";
import { AddSet } from "./components/AddSet";

import "./App.css";

function App() {
    return (
        <>
            <Header />
            {/* <ModeButtons />
            <Flashcard /> */}
            <AddSet />
        </>
    );
}

export default App;

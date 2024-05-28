import React, { useState } from "react";
import { NewQuestion } from "./NewQuestion";
import { sets as initialSets } from "../questions";
import { v4 as uuidv4 } from "uuid";

export const AddSet = () => {
    const [sets, setSets] = useState(initialSets);
    const [newQuestions, setNewQuestions] = useState([
        { id: uuidv4(), type: "", question: "", answer: "" },
        { id: uuidv4(), type: "", question: "", answer: "" },
        { id: uuidv4(), type: "", question: "", answer: "" },
    ]);

    const handleAddSet = () => {
        // Implementacja tworzenia nowego zestawu (nie dostarczona w kodzie)
    };

    const handleAddQuestion = () => {
        setNewQuestions([
            ...newQuestions,
            { id: uuidv4(), type: "", question: "", answer: "" },
        ]);
    };

    const handleDeleteQuestion = (id) => {
        setNewQuestions(newQuestions.filter((question) => question.id !== id));
    };

    return (
        <div className="add-set">
            <div className="add-set-header">
                <h2>Stwórz nowy zestaw do nauki</h2>
                <button className="add-set-button" onClick={handleAddSet}>
                    Stwórz
                </button>
            </div>
            <form className="add-set-form">
                <input
                    className="title-input"
                    type="text"
                    placeholder="Nazwa zestawu"
                />
                {newQuestions.map((question, index) => (
                    <NewQuestion
                        key={question.id}
                        index={index}
                        id={question.id}
                        setNewQuestions={setNewQuestions}
                        newQuestions={newQuestions}
                        handleDeleteQuestion={handleDeleteQuestion}
                    />
                ))}
                <button
                    type="button"
                    className="add-question"
                    onClick={handleAddQuestion}
                >
                    <span className="question-count">{newQuestions.length + 1}</span>
                    + DODAJ PYTANIE
                </button>
                <button
                    type="button"
                    className="add-set-button"
                    onClick={handleAddSet}
                >
                    Stwórz
                </button>
            </form>
        </div>
    );
};

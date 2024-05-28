import React from "react";

export const Card = ({ showAnswer, setShowAnswer, questions, questionIndex }) => {
    const handleShowAnswer = () => setShowAnswer(!showAnswer);
    return (
        <div className="card" onClick={handleShowAnswer}>
            <p className="card-text">
                {showAnswer
                    ? questions[questionIndex].answer
                    : questions[questionIndex].question}
            </p>
        </div>
    );
};

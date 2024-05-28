import React, { useState } from "react";
import { IoTrash } from "react-icons/io5";

export const NewQuestion = ({ index, id, handleDeleteQuestion }) => {
    const [questionType, setQuestionType] = useState("option1");
    const [answerType, setAnswerType] = useState("PRAWDA");
    const [isChecked, setIsChecked] = useState(false);

    const textInputHandler = (e) => {
        const textarea = e.target;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const handleTypeChange = (e) => {
        const value = e.target.value;
        setQuestionType(value);
        setIsChecked(value === "option2");
    };

    const handleAnswerChange = (e) => {
        setAnswerType(e.target.value);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        setQuestionType(isChecked ? "option1" : "option2");
    };

    return (
        <div className="new-question">
            <div className="new-question-label">
                <p className="question-number">{index + 1}</p>
                <div className="demacia">
                    <div className="question-types">
                        <label>
                            <input
                                type="radio"
                                name={`question-type-${index}`}
                                value="option1"
                                onChange={handleTypeChange}
                                checked={questionType === "option1"}
                            />
                            FISZKA
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />
                                <span className="slider round"></span>
                            </label>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name={`question-type-${index}`}
                                value="option2"
                                onChange={handleTypeChange}
                                checked={questionType === "option2"}
                            />
                            PRAWDA/FAŁSZ
                        </label>
                    </div>
                    <button
                        type="button"
                        className="delete-question"
                        onClick={() => handleDeleteQuestion(id)}
                    >
                        <IoTrash size={16} />
                    </button>
                </div>
            </div>
            <div className="inputs-group">
                <div className="input-group">
                    <textarea
                        rows="1"
                        className="question-input"
                        type="text"
                        onChange={(e) => textInputHandler(e)}
                    />
                    <label>Pytanie</label>
                </div>
                <div className="input-group">
                    {questionType === "option1" ? (
                        <textarea
                            onChange={(e) => textInputHandler(e)}
                            rows="1"
                            className="question-input"
                            type="text"
                        />
                    ) : (
                        <div className="question-options">
                            <label htmlFor={`answer-type-${index}`}>
                                <input
                                    type="radio"
                                    id={`answer-type-${index}`}
                                    name={`answer-type-${index}`}
                                    value="PRAWDA"
                                    onChange={handleAnswerChange}
                                    checked={answerType === "PRAWDA"}
                                />
                                <span>PRAWDA</span>
                            </label>

                            <label htmlFor={`answer-type2-${index}`}>
                                <input
                                    type="radio"
                                    id={`answer-type2-${index}`}
                                    name={`answer-type2-${index}`}
                                    value="FAŁSZ"
                                    onChange={handleAnswerChange}
                                    checked={answerType === "FAŁSZ"}
                                />
                                <span>FAŁSZ</span>
                            </label>
                        </div>
                    )}
                    {questionType === "option1" ? (
                        <label>Odpowiedź</label>
                    ) : (
                        <wbr></wbr>
                    )}
                </div>
            </div>
        </div>
    );
};

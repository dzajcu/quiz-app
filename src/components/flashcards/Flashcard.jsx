import { Card } from "./Card";
import { ControlButton } from "./ControlButton";
import { useState } from "react";
import { IoArrowBackOutline, IoArrowForward } from "react-icons/io5";
import { IoIosStar, IoMdShuffle } from "react-icons/io";
import { sets } from "../../questions";

export const Flashcard = () => {
    const [isShuffled, setIsShuffled] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [shuffledQuestions, setShuffledQuestions] = useState([...questions]);

    const handleClickIncrement = () => {
        setQuestionIndex((prevIndex) =>
            prevIndex === questions.length - 1 ? 0 : prevIndex + 1
        );
        setShowAnswer(false);
    };

    const handleClickDecrement = () => {
        setQuestionIndex((prevIndex) =>
            prevIndex === 0 ? questions.length - 1 : prevIndex - 1
        );
        setShowAnswer(false);
    };

    const handleShuffle = () => {
        if (!isShuffled) {
            const shuffled = [...questions].sort(() => Math.random() - 0.5);
            setShuffledQuestions(shuffled);
            setQuestionIndex(0);
        }
        setShowAnswer(false);
        setIsShuffled((prevState) => !prevState);
    };
    const iconSize = 36;

    return (
        <>
            <Card
                showAnswer={showAnswer}
                setShowAnswer={setShowAnswer}
                questions={isShuffled ? shuffledQuestions : questions}
                questionIndex={questionIndex}
            />
            <div className="control-button-group">
                <ControlButton
                    onClick={handleShuffle}
                    icon={
                        <IoMdShuffle
                            size={iconSize}
                            color={isShuffled ? "#7a84b9" : "inherit"}
                        />
                    }
                />
                <div className="control-arrows">
                    <ControlButton
                        onClick={handleClickDecrement}
                        icon={<IoArrowBackOutline size={iconSize * 1.4} />}
                    />
                    <span>
                        {questionIndex + 1}/{questions.length}
                    </span>

                    <ControlButton
                        onClick={handleClickIncrement}
                        icon={<IoArrowForward size={iconSize * 1.4} />}
                    />
                </div>
                <ControlButton icon={<IoIosStar size={iconSize} />} />
            </div>
        </>
    );
};

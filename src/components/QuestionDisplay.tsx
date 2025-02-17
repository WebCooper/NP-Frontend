import {useState} from "react";

interface QuestionData {
    questionText: string;
    options: string[];
}

interface QuestionDisplayProps {
    question: QuestionData;
    onAnswerSubmit: (answer: string) => void;
}

const QuestionDisplay = ({ question, onAnswerSubmit }: QuestionDisplayProps) => {
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleAnswerSubmit = (answer: string) => {
        if (!hasSubmitted) {
            onAnswerSubmit(answer);
            setHasSubmitted(true);
        }
    };

    return (
        <div className="p-4">
            <h3>{question.questionText}</h3>
            <div className="grid gap-2">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerSubmit(option)}
                        className={`p-2 border rounded ${hasSubmitted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                        disabled={hasSubmitted}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionDisplay;

import {useState} from "react";

interface QuestionData {
    questionText: string;
    options: string[];
}

interface QuestionDisplayProps {
    question: QuestionData;
    onAnswerSubmit: (answer: string) => void;
}

const QuestionDisplay = ({
  question,
  onAnswerSubmit,
}: QuestionDisplayProps) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleAnswerSubmit = (answer: string) => {
    if (!hasSubmitted) {
      onAnswerSubmit(answer);
      setHasSubmitted(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 leading-tight">
        {question.questionText}
      </h3>
      <div className="grid gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSubmit(option)}
            className={`
                            w-full p-4 text-left font-medium rounded-lg transition-all duration-200
                            ${
                              hasSubmitted
                                ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-600"
                                : "bg-white hover:bg-blue-50 hover:text-blue-600 hover:shadow-md border-2 border-gray-200 text-gray-700"
                            }
                        `}
            disabled={hasSubmitted}
          >
            <span className="inline-block w-8 h-8 mr-3 text-center leading-8 rounded-full bg-gray-100 text-gray-600">
              {String.fromCharCode(65 + index)}
            </span>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionDisplay;

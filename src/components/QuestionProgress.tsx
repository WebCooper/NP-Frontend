interface QuestionProgressProps {
    currentQuestion: number;
    totalQuestions: number;
    timeRemaining: number;
}

const QuestionProgress = ({ currentQuestion, totalQuestions, timeRemaining }: QuestionProgressProps) => {
    return (
        <div className="flex justify-between p-4">
            <span>Question {currentQuestion} of {totalQuestions}</span>
            <span>Time: {timeRemaining}s</span>
        </div>
    );
};

export default QuestionProgress;
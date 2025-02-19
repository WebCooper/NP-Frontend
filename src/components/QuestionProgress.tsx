interface QuestionProgressProps {
    currentQuestion: number;
    totalQuestions: number;
    timeRemaining: number;
}
const QuestionProgress = ({
  currentQuestion,
  totalQuestions,
  timeRemaining,
}: QuestionProgressProps) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="max-w-3xl mx-auto mb-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-gray-700">
              Question {currentQuestion}
            </span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">{totalQuestions}</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-xl font-semibold text-gray-700">
              {timeRemaining}s
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default QuestionProgress;
// Add these new interfaces
import React from "react";

interface HostQuizStatus {
    totalParticipants: number;
    answeredCount: number;
    timeRemaining: number;
}

interface QuestionData {
    questionNumber: number;
    totalQuestions: number;
    questionText: string;
    options: string[];
    timeLimit: number;
}


const HostQuestionView: React.FC<{
  questionData: QuestionData;
  quizStatus: HostQuizStatus;
  timeRemaining: number;
}> = ({ questionData, quizStatus, timeRemaining }) => {
  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Host Dashboard</h2>
          <div className="px-4 py-2 bg-blue-50 rounded-lg">
            <span className="text-blue-600 font-semibold">
              Question {questionData.questionNumber} of{" "}
              {questionData.totalQuestions}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-blue-700 font-semibold mb-1">
                  Total Participants
                </h3>
                <p className="text-3xl font-bold text-blue-900">
                  {quizStatus.totalParticipants}
                </p>
              </div>
              <div className="bg-blue-200 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-green-700 font-semibold mb-1">
                  Answers Submitted
                </h3>
                <p className="text-3xl font-bold text-green-900">
                  {quizStatus.answeredCount}
                </p>
              </div>
              <div className="bg-green-200 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl shadow-sm border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-amber-700 font-semibold mb-1">
                  Time Remaining
                </h3>
                <p className="text-3xl font-bold text-amber-900">
                  {timeRemaining}s
                </p>
              </div>
              <div className="bg-amber-200 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-amber-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Current Question
          </h3>
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">
            {questionData.questionText}
          </p>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700 mb-3">
              Answer Options:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questionData.options.map((option, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center">
                    <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full mr-3 text-gray-600 font-semibold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-gray-700">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostQuestionView;
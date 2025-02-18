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


// Add this new component
const HostQuestionView: React.FC<{
    questionData: QuestionData;
    quizStatus: HostQuizStatus;
}> = ({ questionData, quizStatus }) => {
    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Host View</h2>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-100 p-4 rounded-lg">
                        <h3 className="font-semibold">Participants</h3>
                        <p className="text-2xl">{quizStatus.totalParticipants}</p>
                    </div>

                    <div className="bg-green-100 p-4 rounded-lg">
                        <h3 className="font-semibold">Answers Submitted</h3>
                        <p className="text-2xl">{quizStatus.answeredCount}</p>
                    </div>

                    <div className="bg-yellow-100 p-4 rounded-lg">
                        <h3 className="font-semibold">Time Remaining</h3>
                        <p className="text-2xl">{quizStatus.timeRemaining}s</p>
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="text-xl font-semibold">Current Question:</h3>
                    <p className="text-lg mt-2">{questionData.questionText}</p>

                    <div className="mt-4">
                        <h4 className="font-semibold">Options:</h4>
                        <ul className="list-disc pl-6">
                            {questionData.options.map((option, index) => (
                                <li key={index}>{option}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default HostQuestionView;
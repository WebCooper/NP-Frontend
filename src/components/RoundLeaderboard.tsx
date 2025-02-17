interface RoundLeaderboardEntry {
    username: string;
    score: number;
    timeTaken: number;
    isCorrect: boolean;
}

interface RoundLeaderboardProps {
    entries: RoundLeaderboardEntry[];
    onStopQuiz: () => void;
    onNextQuestion: () => void;
    isHost: boolean;
}

const RoundLeaderboard = ({ entries, onStopQuiz, onNextQuestion,isHost }: RoundLeaderboardProps) => {
    return (
        <div className="p-4">
            <h3>Round Results</h3>
            <div className="space-y-2">
                {entries.map((entry, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <span>{entry.username}</span>
                        <span>{entry.score} points</span>
                    </div>
                ))}
            </div>
            {isHost && (
                <div className="mt-4">
                    <button onClick={onStopQuiz} className="px-4 py-2 bg-red-500 text-white rounded">
                        Stop Live Quiz
                    </button>
                    <button onClick={onNextQuestion} className="ml-2 px-4 py-2 bg-green-500 text-white rounded">
                        Next Question
                    </button>
                </div>
            )}

        </div>
    );
};

export default RoundLeaderboard;
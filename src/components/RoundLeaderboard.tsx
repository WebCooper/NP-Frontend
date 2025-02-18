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
// ...existing interfaces remain the same...

const RoundLeaderboard = ({ entries, onStopQuiz, onNextQuestion, isHost }: RoundLeaderboardProps) => {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Round Results</h3>
            
            <div className="space-y-3">
                {/* Header */}
                <div className="flex justify-between items-center pb-2 border-b-2 border-gray-200 font-semibold text-gray-600">
                    <span>Player</span>
                    <div className="flex gap-8">
                        <span>Time</span>
                        <span>Score</span>
                    </div>
                </div>

                {/* Leaderboard Entries */}
                {entries.map((entry, index) => (
                    <div 
                        key={index} 
                        className={`flex justify-between items-center p-3 rounded-lg transition-all hover:scale-102 
                            ${index === 0 ? 'bg-yellow-50 border-2 border-yellow-200' : 
                            index === 1 ? 'bg-gray-50 border border-gray-200' :
                            index === 2 ? 'bg-orange-50 border border-orange-200' : 'bg-white border border-gray-100'}`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="font-semibold w-6">{index + 1}.</span>
                            <span className="font-medium">{entry.username}</span>
                        </div>
                        <div className="flex gap-8 items-center">
                            <span className="text-gray-600">{entry.timeTaken.toFixed(1)}s</span>
                            <span className={`font-semibold ${entry.isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                                {entry.score} pts
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Host Controls */}
            {isHost && (
                <div className="mt-8 flex justify-center gap-4">
                    <button 
                        onClick={onStopQuiz} 
                        className="px-6 py-2.5 bg-red-500 text-white rounded-lg font-medium 
                            hover:bg-red-600 transition-colors duration-200 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Stop Live Quiz
                    </button>
                    <button 
                        onClick={onNextQuestion} 
                        className="px-6 py-2.5 bg-green-500 text-white rounded-lg font-medium 
                            hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
                    >
                        Next Question
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default RoundLeaderboard;
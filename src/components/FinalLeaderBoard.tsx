interface LeaderboardEntry {
  username: string;
  totalScore: number;
  timeTaken: number;
  isCorrect: boolean;
}

interface FinalLeaderboardProps {
  entries: LeaderboardEntry[];
  isHost: boolean;
  onStopQuiz: () => void;
}

const FinalLeaderboard = ({
  entries,
  isHost,
  onStopQuiz,
}: FinalLeaderboardProps) => {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-28">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          🏆 Final Leaderboard 🏆
        </h2>
        <p className="text-gray-600">
          Quiz Complete! Here are the final standings.
        </p>
        
      </div>

      <div className="space-y-4">
        {/* Top 3 Winners Podium */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex justify-center items-end gap-6 relative w-full max-w-xl">
            {/* Second Place */}
            {entries[1] && (
              <div className="flex flex-col items-center w-1/3 z-10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 border-4 border-gray-200 flex items-center justify-center mb-2 shadow-lg">
                  <span className="text-3xl">🥈</span>
                </div>
                <div className="bg-gray-100 rounded-t-xl px-4 py-3 text-center w-full shadow-md">
                  <p className="font-semibold text-gray-800 truncate">
                    {entries[1].username}
                  </p>
                  <p className="text-gray-600 font-medium">
                    {entries[1].totalScore} pts
                  </p>
                </div>
                <div className="bg-gray-200 h-24 w-full rounded-b-xl"></div>
              </div>
            )}

            {/* First Place */}
            {entries[0] && (
              <div className="flex flex-col items-center w-1/3 -mt-8 z-20">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-300 border-4 border-yellow-200 flex items-center justify-center mb-2 shadow-lg animate-bounce-slow">
                  <span className="text-4xl">👑</span>
                </div>
                <div className="bg-yellow-50 rounded-t-xl px-4 py-4 text-center w-full border-2 border-yellow-200 shadow-lg">
                  <p className="font-bold text-lg text-yellow-800 truncate">
                    {entries[0].username}
                  </p>
                  <p className="text-yellow-600 font-semibold text-lg">
                    {entries[0].totalScore} pts
                  </p>
                </div>
                <div className="bg-yellow-200 h-32 w-full rounded-b-xl"></div>
              </div>
            )}

            {/* Third Place */}
            {entries[2] && (
              <div className="flex flex-col items-center w-1/3 z-10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 border-4 border-orange-200 flex items-center justify-center mb-2 shadow-lg">
                  <span className="text-3xl">🥉</span>
                </div>
                <div className="bg-orange-50 rounded-t-xl px-4 py-3 text-center w-full shadow-md">
                  <p className="font-semibold text-gray-800 truncate">
                    {entries[2].username}
                  </p>
                  <p className="text-gray-600 font-medium">
                    {entries[2].totalScore} pts
                  </p>
                </div>
                <div className="bg-orange-200 h-20 w-full rounded-b-xl"></div>
              </div>
            )}
          </div>
        </div>
        {/* Rest of the Leaderboard */}
        <div className="bg-gray-50 rounded-lg p-4">
          {entries.slice(3).map((entry, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 border-b border-gray-200 last:border-0 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-500 w-8">
                  {index + 4}.
                </span>
                <span className="font-medium">{entry.username}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-700">
                  {entry.totalScore} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Host Controls */}
      {isHost && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={onStopQuiz}
            className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium 
                            hover:bg-red-600 transition-all duration-200 flex items-center gap-2
                            shadow-md hover:shadow-lg active:transform active:scale-95"
          >
            End Quiz Session
          </button>
        </div>
      )}
    </div>
  );
};

export default FinalLeaderboard;

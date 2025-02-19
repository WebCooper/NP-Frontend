interface Participant {
  id: string;
  username: string;
}

interface WaitingRoomUIProps {
  roomId: string;
  threadNumber: number | null;
  username: string;
  participants: Participant[];
  isHost: boolean;
  onStartQuiz: () => void;
  onStopQuiz: () => void;
}

const WaitingRoomUI = ({
  roomId,
  threadNumber,
  username,
  participants,
  isHost,
  onStartQuiz,
  onStopQuiz,
}: WaitingRoomUIProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent py-2">
              Waiting Room
            </h1>
            <div className="mt-4 px-4 py-2 bg-blue-50 rounded-full">
              <p className="text-blue-600 font-medium">
                Room ID: <span className="font-bold">{roomId}</span>
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl text-gray-800 font-medium animate-pulse flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isHost
                        ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        : "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    }
                  />
                </svg>
                {isHost
                  ? "You are the host - Start when ready"
                  : "Please Wait for the Host to Start the Quiz"}
              </h2>
            </div>

            <div className="mt-6 space-y-3">
              <div className="inline-flex items-center px-4 py-2 bg-indigo-50 rounded-lg">
                <span className="text-indigo-700">Thread Number:</span>
                <span className="ml-2 font-semibold text-indigo-600">
                  {threadNumber !== null ? threadNumber : "Loading..."}
                </span>
              </div>

              <div className="flex items-center justify-center space-x-2 text-lg">
                <span className="text-gray-700">Welcome,</span>
                <span className="font-bold text-blue-600">{username}</span>
                <span className="text-gray-700">
                  {isHost
                    ? " "
                    : "Get Ready For the Quiz!"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Participants Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-6">
            Participants ({participants.length})
          </h3>
          <div className="max-h-[300px] overflow-y-auto px-4 custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {participants.map((p, index) => (
                <div
                  key={p.id || index}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="font-medium text-gray-700">
                    {p.username}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Host Controls */}
          {isHost && (
            <div className="mt-24 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={onStopQuiz}
                className="group px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Stop Live Quiz
              </button>
              <button
                onClick={onStartQuiz}
                className="group px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Start the Quiz
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #94a3b8;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default WaitingRoomUI;

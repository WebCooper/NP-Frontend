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


const WaitingRoomUI = ({ roomId, threadNumber, username, participants, isHost, onStartQuiz, onStopQuiz }: WaitingRoomUIProps) => {
    return (
    <div className="max-w-5xl mx-auto p-20 mt-10">
        <div className="flex flex-col mb-8">
            <div>
                <h1 className="text-4xl font-bold text-gray-900">Waiting Room</h1>
                <p className="text-gray-600 mt-2">Room ID: {roomId}</p>
            </div>
        
            <div className="mt-3 text-center">
                <h1 className="text-xl text-gray-800 font-medium animate-pulse">
                  Please Wait for the Host to Start the Quiz
                </h1>
                
                <div className="mt-3 space-y-2 text-gray-700">
                    <p className="flex items-center justify-center gap-2">
                        Thread Number: 
                        <span className="font-semibold text-blue-600">
                        {threadNumber !== null ? threadNumber : "Loading..."}
                        </span>
                    </p>
                    
                    <p className="flex items-center justify-center gap-2">
                        Welcome
                        <span className="font-semibold text-blue-600">
                        {username}
                        </span>
                        Get Ready For the Quiz
                    </p>
                </div>
            </div>

            <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-700 text-center mb-4">
                  All Participants :
                </h3>
                <ul className="space-y-2 max-h-[200px] overflow-y-auto bg-white/50 rounded-lg p-4">
                {participants.map((p, index) => (
                    <li 
                    key={p.id || index}
                    className="px-4 py-2 border-solid border-2 text-black font-semibold rounded-lg hover:shadow-md transition-shadow duration-200 text-center"
                    >
                    {p.username}
                    </li>
                ))}
                </ul>
            </div>

            {isHost && (
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                        onClick={onStopQuiz}
                        className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                    >
                        Stop Live Quiz
                    </button>
                    <button 
                        onClick={onStartQuiz}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                    >
                        Start the Quiz
                    </button>
                </div>
            )}
        </div>
    </div>
    );
};
export default WaitingRoomUI;

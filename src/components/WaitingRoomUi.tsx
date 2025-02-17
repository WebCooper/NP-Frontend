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
        <div className="pt-20">
            <h2>Waiting Room - {roomId}</h2>
            <p>Thread Number: <strong>{threadNumber !== null ? threadNumber : "Loading..."}</strong></p>
            <p>Your username: <strong>{username}</strong></p>
            <ul>
                {participants.map((p) => (
                    <li key={p.id}>{p.username}</li>
                ))}
            </ul>

            {isHost && (
                <div className="m-2">
                    <button onClick={onStopQuiz} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                        Stop Live Quiz
                    </button>
                    <button onClick={onStartQuiz} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                        Start the Quiz
                    </button>
                </div>
            )}
        </div>
    );
};
export default WaitingRoomUI;
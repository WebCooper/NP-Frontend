import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

interface Participant {
    id: string;
    username: string;
}

const WaitingRoom: React.FC = () => {
    const { socket } = useSocket();
    const { roomId } = useParams<{ roomId: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [username] = useState<string>(user ? user.name : `Guest${Math.floor(1000 + Math.random() * 9000)}`);
    const [quizId, setQuizId] = useState<string | null>(null);
    const [threadNumber, setThreadNumber] = useState<number | null>(null);
    const [isHost, setIsHost] = useState<boolean>(false);

    useEffect(() => {
        if (!socket || !roomId) return;

        console.log("📢 Joining room:", roomId, "as", username);
        socket.emit("join-room", { roomId, username });

        socket.on("room-details", (data) => {
            setQuizId(data.quizId);
            setThreadNumber(data.threadId);
            setIsHost(!!user && data.hostId === user?.id);

        });

        socket.on("user-joined", (data) => {
            setParticipants([...data.participants]);
        });

        socket.on("quiz-ended", () => {
            alert("Quiz has been stopped!");
            navigate("/");
        });

        return () => {
            socket.off("room-details");
            socket.off("user-joined");
            socket.off("quiz-ended");
        };
    }, [socket, roomId, username, user, navigate]);

    const stopLiveQuiz = async () => {
        if (!quizId || !roomId) return;
        try {
            await axios.patch(`http://localhost:4001/api/quiz/set-not-live/${quizId}`);

            if (socket) {
                socket.emit("end-quiz", { roomId });
            } else {
                console.error("Socket is not initialized.");
            }
        } catch (error) {
            alert("Error stopping quiz.");
            console.log(error);
        }
    };


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
                <button onClick={stopLiveQuiz} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                    Stop Live Quiz
                </button>
            )}
        </div>
    );
};

export default WaitingRoom;

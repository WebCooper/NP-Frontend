import React, { useEffect, useState, useRef } from "react";
import { useSocket } from "../context/SocketContext";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import WaitingRoomUI from "../components/WaitingRoomUi";
import QuestionProgress from "../components/QuestionProgress";
import QuestionDisplay from "../components/QuestionDisplay";
import RoundLeaderboard from "../components/RoundLeaderboard";

interface Participant {
    id: string;
    username: string;
}

interface QuestionData {
    questionNumber: number;
    totalQuestions: number;
    questionText: string;
    options: string[];
    timeLimit: number;
}

interface LeaderboardEntry {
    username: string;
    totalScore: number;
    timeTaken: number;
    isCorrect: boolean;
}

interface RoundLeaderboardEntry {
    username: string;
    score: number;
    timeTaken: number;
    isCorrect: boolean;
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

    const [quizState, setQuizState] = useState<'waiting' | 'question' | 'results' | 'completed'>('waiting');
    const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
    const [roundResults, setRoundResults] = useState<RoundLeaderboardEntry[]>([]);
    const [finalLeaderboard, setFinalLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [timeRemaining, setTimeRemaining] = useState<number>(0);

    const timerRef = useRef<number | null>(null);


    useEffect(() => {
        if (!socket || !roomId) return;

        socket.emit("join-room", { roomId, username });

        socket.on("room-error", () => navigate("/"));
        socket.on("room-details", (data) => {
            setQuizId(data.quizId);
            setThreadNumber(data.threadId);
            setIsHost(!!user && data.hostId === user?.id);
        });

        socket.on("user-joined", (data) => setParticipants([...data.participants]));
        socket.on("quiz-ended", () => {
            alert("Quiz has been stopped!");
            navigate("/");
        });

        socket.on("question", ({ question }: { question: QuestionData }) => {
            setQuizState("question");
            setCurrentQuestion(question);
            setTimeRemaining(question.timeLimit); // Reset the timer

            if (timerRef.current) clearInterval(timerRef.current); // Clear previous timer

            timerRef.current = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current!);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        });

        socket.on("answer-result", ({ isCorrect }) => {
            alert(isCorrect ? "✅ Correct!" : "❌ Wrong!");
        });

        socket.on("round-results", ({ roundLeaderboard, correctAnswer }) => {
            setQuizState("results");
            setRoundResults(roundLeaderboard);
            alert(`✅ Correct answer was: ${correctAnswer}`);
        });

        socket.on("quiz-completed", ({ finalLeaderboard }) => {
            setQuizState("completed");
            setFinalLeaderboard(finalLeaderboard);
            alert("🎉 Quiz Completed! Check the final leaderboard.");
        });

        return () => {
            socket.off("room-details");
            socket.off("user-joined");
            socket.off("quiz-ended");
            socket.off("room-error");
            socket.off("question");
            socket.off("answer-result");
            socket.off("round-results");
            socket.off("quiz-completed");

            if (timerRef.current) clearInterval(timerRef.current); // Clear timer on unmount
        };
    }, [socket, roomId, username, user, navigate]);

    const startQuestions = () => socket?.emit("start-quiz", { roomId });

    const stopLiveQuiz = async () => {
        if (!quizId || !roomId) return;
        try {
            await axios.patch(`http://localhost:4001/api/quiz/set-not-live/${quizId}`);
            socket?.emit("end-quiz", { roomId });
        } catch {
            alert("Error stopping quiz.");
        }
    };

    const goToNextQuestion = () => {
        socket?.emit("next-question", { roomId });
    };

    return (
        <div>
            {quizState === "waiting" && (
                <WaitingRoomUI
                    roomId={roomId || ""}
                    threadNumber={threadNumber}
                    username={username}
                    participants={participants}
                    isHost={isHost}
                    onStartQuiz={startQuestions}
                    onStopQuiz={stopLiveQuiz}
                />
            )}

            {quizState === "question" && currentQuestion && (
                <div className="container pt-20">
                    <QuestionProgress
                        currentQuestion={currentQuestion.questionNumber}
                        totalQuestions={currentQuestion.totalQuestions}
                        timeRemaining={timeRemaining}
                    />
                    <QuestionDisplay
                        question={currentQuestion}
                        onAnswerSubmit={(answer) => socket?.emit("submit-answer", { roomId, answer })}
                    />
                </div>
            )}

            {quizState === "results" && (
                <div className="pt-20">

                <RoundLeaderboard
                    entries={roundResults}
                    isHost={isHost}
                    onStopQuiz={stopLiveQuiz}
                    onNextQuestion={goToNextQuestion}
                />
                </div>
            )}

            {quizState === "completed" && (
                <div className="container pt-24">
                    <h2>🏆 Final Leaderboard 🏆</h2>
                    <ul>
                        {finalLeaderboard.map((entry, index) => (
                            <li key={index}>{index + 1}. {entry.username} - {entry.totalScore} pts</li>
                        ))}
                    </ul>
                    {isHost && (
                        <button onClick={stopLiveQuiz} className="px-4 py-2 bg-red-500 text-white rounded">
                            Stop Live Quiz
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default WaitingRoom;

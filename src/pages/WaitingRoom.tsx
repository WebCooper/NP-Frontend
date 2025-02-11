import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useParams } from "react-router-dom";

interface Participant {
    id: string;
    username: string;
}

// Function to generate a random username
const generateRandomUsername = (): string => {
    const adjectives = ["Quick", "Happy", "Bright", "Clever", "Cool", "Lucky", "Brave"];
    const nouns = ["Tiger", "Eagle", "Panda", "Wolf", "Falcon", "Dragon", "Shark"];
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${Math.floor(100 + Math.random() * 900)}`;
};

const WaitingRoom: React.FC = () => {
    const { socket } = useSocket();
    const { roomId } = useParams<{ roomId: string }>();
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [username] = useState<string>(generateRandomUsername());

    useEffect(() => {
        if (!socket || !roomId) {
            console.log("No socket or roomId");
            return;
        }

        console.log("📢 Joining room:", roomId, "with username:", username);
        socket.emit("join-room", { roomId, username });

        socket.on("user-joined", (data) => {
            console.log("🟢 Users in the room:", data.participants);
            setParticipants([...data.participants]);
        });

        socket.on("error", (error) => {
            console.error("WebSocket error:", error.message);
            alert(error.message); // Notify the user
        });

        return () => {
            socket.off("user-joined");
            socket.off("error");
        };
    }, [socket, roomId, username]);

    return (
        <div className="pt-20">
            <h2>Waiting Room - {roomId}</h2>
            <p>Your username: <strong>{username}</strong></p>
            <ul>
                {participants.map((p) => (
                    <li key={p.id}>{p.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default WaitingRoom;

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

// Define the type for the socket context
interface SocketContextType {
    socket: Socket | null;
}

// Create the context with an initial null value
const SocketContext = createContext<SocketContextType | undefined>(undefined);

// Custom hook to use the SocketContext
export const useSocket = (): SocketContextType => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};

// Define the props type for the provider
interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io("http://localhost:4001"); // Connect to backend
        setSocket(newSocket);

        // Log the client ID when connected
        newSocket.on("connect", () => {
            console.log("✅ Connected to WebSocket with ID:", newSocket.id);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

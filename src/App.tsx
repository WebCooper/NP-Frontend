import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import TeacherHome from "./pages/TeacherHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import CreateQuiz from "./pages/createQuiz.tsx";
import UpdateQuiz from "./pages/updateQuiz.tsx";
import AddQuestions from "./pages/AddQuestions";
import { SocketProvider } from "./context/SocketContext.tsx";
import WaitingRoom from "./pages/WaitingRoom.tsx";


function App() {
    return (
        <SocketProvider>
            <BrowserRouter>
                <AuthContextProvider> {/* Move AuthContextProvider inside BrowserRouter */}
                    <Navbar />
                    <Routes>
                        {/* Public Routes (Accessible by Everyone) */}
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/waiting-room/:roomId" element={<WaitingRoom />} />

                        {/* Protected Routes (Require Authentication) */}
                        <Route path="/home" element={<TeacherHome />} />
                        <Route path="/create-quiz" element={<CreateQuiz />} />
                        <Route path="/quiz/edit/:quizId" element={<UpdateQuiz />} />
                        <Route path="/quiz/add-questions/:quizId" element={<AddQuestions />} />
                    </Routes>
                </AuthContextProvider>
            </BrowserRouter>
        </SocketProvider>
    );
}


export default App;

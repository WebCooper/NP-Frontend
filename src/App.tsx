import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Landing from './pages/Landing'
import TeacherHome from './pages/TeacherHome'
import { BrowserRouter, Routes, Route } from'react-router-dom'
import Navbar from './components/Navbar'
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
      <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/teacher-home" element={<TeacherHome />} />

          </Routes>
        </AuthContextProvider>
    </BrowserRouter>
  
  )
}

export default App

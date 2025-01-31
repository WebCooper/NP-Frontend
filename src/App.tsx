import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Landing from './pages/Landing'
import { BrowserRouter, Routes, Route } from'react-router-dom'
import Navbar from './components/Navbar'
function App() {

  return (
    <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Games from './pages/Games'
import Rentals from './pages/Rentals'
import Profile from './pages/Profile'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="/games" element={<Games/>} />
        <Route path="/rentals" element={<Rentals/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </>
  )
}

export default App

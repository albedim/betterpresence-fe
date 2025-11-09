import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Homepage from './pages/homepage'
import Dashboard from './pages/dashboard'
import ModalWrapper from './components/modal'
import ConnectApplicationModal from './components/modal/request_desktop_modal'
import Signin from './pages/signin'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard selectedPage="all" />} />
        <Route path="/dashboard/favorites" element={<Dashboard selectedPage="favorites" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

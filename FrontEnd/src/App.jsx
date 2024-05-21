import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './components/pages/HomePage'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom' 
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {

  return (
    <>
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App

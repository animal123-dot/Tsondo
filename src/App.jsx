import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Generate from './pages/Generate'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Privacy from './pages/Privacy'

export default function App(){
  return (
    <div className="app">
      <header className="site-header">
        <h1>Tsondo</h1>
        <nav>
          <Link to="/">Generate</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Generate/>} />
          <Route path="/gallery" element={<Gallery/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/privacy" element={<Privacy/>} />
        </Routes>
      </main>
      <footer className="site-footer">© {new Date().getFullYear()} Tsondo</footer>
    </div>
  )
}

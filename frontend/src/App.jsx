import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import AboutModel from './pages/AboutModel'

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col" style={{ background: 'rgb(var(--background))' }}>
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutModel />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default App

import { NavLink } from 'react-router-dom'
import { Brain, Home, Info, Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'

function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-[rgb(var(--card))]/80 backdrop-blur-xl border-b border-[rgb(var(--border))]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo & Title */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl md:rounded-2xl opacity-20 blur-xl" 
                   style={{ background: 'linear-gradient(135deg, rgb(var(--primary)), rgb(var(--accent)))' }}>
              </div>
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg"
                   style={{ background: 'linear-gradient(135deg, rgb(var(--primary)), rgb(var(--secondary)))' }}>
                <Brain className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm md:text-xl font-bold text-[rgb(var(--card-foreground))]">
                Stroke Prediction AI
              </h1>
              <p className="text-[10px] md:text-xs text-[rgb(var(--muted-foreground))] hidden sm:block">
                Clinical Decision Support System
              </p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center gap-1 md:gap-2">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-1 md:gap-2 ${
                  isActive 
                    ? 'text-white shadow-lg'
                    : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--card-foreground))] hover:bg-[rgb(var(--muted))]'
                }`
              }
              style={({ isActive }) => isActive ? { 
                background: 'linear-gradient(135deg, rgb(var(--primary)), rgb(var(--secondary)))' 
              } : {}}
            >
              <Home className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Home</span>
            </NavLink>
            
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-1 md:gap-2 ${
                  isActive 
                    ? 'text-white shadow-lg'
                    : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--card-foreground))] hover:bg-[rgb(var(--muted))]'
                }`
              }
              style={({ isActive }) => isActive ? { 
                background: 'linear-gradient(135deg, rgb(var(--primary)), rgb(var(--secondary)))' 
              } : {}}
            >
              <Info className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">About</span>
            </NavLink>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-1 md:ml-2 p-2 md:p-2.5 rounded-lg md:rounded-xl transition-all duration-200 hover:bg-[rgb(var(--muted))]"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 md:w-5 md:h-5 text-[rgb(var(--muted-foreground))]" />
              ) : (
                <Sun className="w-4 h-4 md:w-5 md:h-5 text-[rgb(var(--accent))]" />
              )}
            </button>
          </nav>
        </div>
      </div>
    </motion.header>
  )
}

export default Navbar

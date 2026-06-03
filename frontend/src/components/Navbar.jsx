import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <div className="brand-block">
        <span className="eyebrow">PFA ML • Clinical Decision Support</span>
        <h1>Stroke Prediction Dashboard</h1>
        <p>Analyse du risque d'AVC avec un pipeline ML interpretable et optimise pour le recall.</p>
      </div>

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About Model</NavLink>
      </nav>
    </header>
  )
}

export default Navbar

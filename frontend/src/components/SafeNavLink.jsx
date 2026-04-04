import { NavLink, useNavigate } from "react-router-dom"

function SafeNavLink({ to, children, ...props }) {
  const navigate = useNavigate()

  const handleClick = (e) => {
    if (!navigator.onLine) {
      e.preventDefault()
      navigate("/offline")
    }
  }

  return (
    <NavLink to={to} onClick={handleClick} {...props}>
      {children}
    </NavLink>
  )
}

export default SafeNavLink
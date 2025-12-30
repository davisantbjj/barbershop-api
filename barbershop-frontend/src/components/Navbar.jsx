import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          💈 Barbershop
        </Link>

        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Serviços</Link></li>
          <li><Link to="/barbers">Barbeiros</Link></li>
          
          {user ? (
            <>
              <li><Link to="/appointments">Agendamentos</Link></li>
              {(user.roleKey === 'admin' || user.role === 'admin') && (
                <li><Link to="/admin">Admin</Link></li>
              )}
              <li>
                <span className="user-name">Olá, {user.name}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="btn-logout">
                  Sair
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Cadastrar</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

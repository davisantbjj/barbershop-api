import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>💈 Bem-vindo à Barbershop</h1>
          <p>O melhor lugar para cuidar do seu visual</p>
          {!user && (
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary">
                Cadastrar
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Entrar
              </Link>
            </div>
          )}
          {user && (
            <Link to="/appointments" className="btn btn-primary">
              Fazer Agendamento
            </Link>
          )}
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Nossos Diferenciais</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">✂️</span>
              <h3>Profissionais Qualificados</h3>
              <p>Barbeiros experientes e especializados</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📅</span>
              <h3>Agendamento Online</h3>
              <p>Agende seu horário de forma prática</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">⭐</span>
              <h3>Atendimento Premium</h3>
              <p>Serviços de alta qualidade</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Pronto para renovar seu visual?</h2>
          <Link to="/services" className="btn btn-large">
            Ver Serviços
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

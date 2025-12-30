// Middleware para verificar se o usuário tem uma das roles permitidas
const checkRole = (...allowedRoles) => {
  // Normalize allowed roles to uppercase for comparison
  const allowed = allowedRoles.map(r => String(r).toUpperCase());
  return (req, res, next) => {
    try {
      if (!req.user) return res.status(401).json({ error: 'Usuário não autenticado' });

      const userRole = String(req.user.role || '').toUpperCase();

      if (!allowed.includes(userRole)) {
        return res.status(403).json({
          error: 'Acesso negado',
          message: `Apenas usuários com roles [${allowed.join(', ')}] podem acessar este recurso`
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao verificar permissões', message: error.message });
    }
  };
};

// Middlewares com roles em caixa alta compatíveis com o schema
const isAdmin = checkRole('ADMIN');
const isAdminOrBarber = checkRole('ADMIN', 'BARBEIRO');

module.exports = { checkRole, isAdmin, isAdminOrBarber };

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Pegar o token do header Authorization
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'Token não fornecido'
      });
    }

    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Adicionar informações do usuário ao request
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Token inválido ou expirado',
      message: error.message
    });
  }
};

module.exports = authMiddleware;

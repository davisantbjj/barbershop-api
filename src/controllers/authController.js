const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

// Gerar token JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d'
    }
  );
};

// Registrar novo usuário
const register = async (req, res) => {
  try {
      const { name, email, password, role } = req.body;

    // Validações básicas
    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'Nome, email e senha são obrigatórios'
      });
    }

    // Verificar se o usuário já existe
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({
        error: 'Email já cadastrado'
      });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Normalizar role para os valores do DB (aceita valores em inglês também)
    const roleMap = { admin: 'ADMIN', barber: 'BARBEIRO', client: 'CLIENTE' };
    const dbRole = role ? (roleMap[role.toLowerCase()] || String(role).toUpperCase()) : 'CLIENTE';

    // Criar novo usuário
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: dbRole
    });

    // Gerar token
    const token = generateToken(user);

    const roleKeyMap = { ADMIN: 'admin', BARBEIRO: 'barber', CLIENTE: 'client' };
    return res.status(201).json({
      message: 'Usuário registrado com sucesso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        roleKey: roleKeyMap[user.role] || String(user.role).toLowerCase()
      },
      token
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    return res.status(500).json({
      error: 'Erro ao registrar usuário',
      message: error.message
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validações básicas
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email e senha são obrigatórios'
      });
    }

    // Procurar o usuário
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        error: 'Credenciais inválidas'
      });
    }

    // Validar senha
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        error: 'Credenciais inválidas'
      });
    }

    // Gerar token
    const token = generateToken(user);

    const roleKeyMap = { ADMIN: 'admin', BARBEIRO: 'barber', CLIENTE: 'client' };
    return res.status(200).json({
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        roleKey: roleKeyMap[user.role] || String(user.role).toLowerCase()
      },
      token
    });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({
      error: 'Erro ao realizar login',
      message: error.message
    });
  }
};

// Obter perfil do usuário autenticado
const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt']
    });

    if (!user) {
      return res.status(404).json({
        error: 'Usuário não encontrado'
      });
    }

    return res.status(200).json({
      user
    });
  } catch (error) {
    console.error('Erro ao obter perfil:', error);
    return res.status(500).json({
      error: 'Erro ao obter perfil',
      message: error.message
    });
  }
};

module.exports = {
  register,
  login,
  getProfile
};

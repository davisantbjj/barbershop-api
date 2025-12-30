const { Barber, User } = require('../models');
const bcrypt = require('bcryptjs');

// Criar barbeiro
const createBarber = async (data) => {
  const { name, email, phone, specialization, userId, password } = data;

  if (!name || !email) {
    throw new Error('Nome e email são obrigatórios');
  }

  // Se userId foi fornecido, verificar se o usuário existe
  let uid = userId;
  if (userId) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('Usuário não encontrado');
  } else {
    // Criar um registro em users para este barbeiro
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error('Email já cadastrado');

    const pwd = password || 'changeme';
    const hashed = await bcrypt.hash(pwd, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      role: 'BARBEIRO'
    });
    uid = newUser.id;
  }

  const barber = await Barber.create({ userId: uid, especialidade: specialization, active: true });
  return barber;
};

// Listar todos os barbeiros
const getAllBarbers = async () => {
  const barbers = await Barber.findAll({
    include: [{
      model: User,
      attributes: ['id', 'name', 'email', 'role']
    }],
    order: [['name', 'ASC']]
  });
  return barbers;
};

// Buscar barbeiro por ID
const getBarberById = async (id) => {
  const barber = await Barber.findByPk(id, {
    include: [{
      model: User,
      attributes: ['id', 'name', 'email', 'role']
    }]
  });
  if (!barber) {
    throw new Error('Barbeiro não encontrado');
  }
  return barber;
};

// Atualizar barbeiro
const updateBarber = async (id, data) => {
  const barber = await Barber.findByPk(id);
  if (!barber) {
    throw new Error('Barbeiro não encontrado');
  }

  // Se o email for alterado, verificar se já existe
  if (data.email && data.email !== barber.email) {
    const existingBarber = await Barber.findOne({ where: { email: data.email } });
    if (existingBarber) {
      throw new Error('Email já cadastrado');
    }
  }

  await barber.update(data);
  return barber;
};

// Deletar barbeiro
const deleteBarber = async (id) => {
  const barber = await Barber.findByPk(id);
  if (!barber) {
    throw new Error('Barbeiro não encontrado');
  }

  await barber.destroy();
  return { message: 'Barbeiro deletado com sucesso' };
};

module.exports = {
  createBarber,
  getAllBarbers,
  getBarberById,
  updateBarber,
  deleteBarber
};

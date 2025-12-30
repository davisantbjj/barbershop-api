const { Client } = require('../models');

// Criar cliente
const createClient = async (data) => {
  const { name, email, phone } = data;

  // Verificar se email já existe
  const existingClient = await Client.findOne({ where: { email } });
  if (existingClient) {
    throw new Error('Email já cadastrado');
  }

  const client = await Client.create({ name, email, phone });
  return client;
};

// Listar todos os clientes
const getAllClients = async () => {
  const clients = await Client.findAll({
    order: [['createdAt', 'DESC']]
  });
  return clients;
};

// Buscar cliente por ID
const getClientById = async (id) => {
  const client = await Client.findByPk(id);
  if (!client) {
    throw new Error('Cliente não encontrado');
  }
  return client;
};

// Atualizar cliente
const updateClient = async (id, data) => {
  const client = await Client.findByPk(id);
  if (!client) {
    throw new Error('Cliente não encontrado');
  }

  // Se o email for alterado, verificar se já existe
  if (data.email && data.email !== client.email) {
    const existingClient = await Client.findOne({ where: { email: data.email } });
    if (existingClient) {
      throw new Error('Email já cadastrado');
    }
  }

  await client.update(data);
  return client;
};

// Deletar cliente
const deleteClient = async (id) => {
  const client = await Client.findByPk(id);
  if (!client) {
    throw new Error('Cliente não encontrado');
  }

  await client.destroy();
  return { message: 'Cliente deletado com sucesso' };
};

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient
};

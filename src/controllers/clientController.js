const clientService = require('../services/clientService');

// Criar cliente
const createClient = async (req, res) => {
  try {
    const client = await clientService.createClient(req.body);
    return res.status(201).json({
      message: 'Cliente criado com sucesso',
      client
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

// Listar todos os clientes
const getAllClients = async (req, res) => {
  try {
    const clients = await clientService.getAllClients();
    return res.status(200).json({
      clients
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

// Buscar cliente por ID
const getClientById = async (req, res) => {
  try {
    const client = await clientService.getClientById(req.params.id);
    return res.status(200).json({
      client
    });
  } catch (error) {
    return res.status(404).json({
      error: error.message
    });
  }
};

// Atualizar cliente
const updateClient = async (req, res) => {
  try {
    const client = await clientService.updateClient(req.params.id, req.body);
    return res.status(200).json({
      message: 'Cliente atualizado com sucesso',
      client
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

// Deletar cliente
const deleteClient = async (req, res) => {
  try {
    const result = await clientService.deleteClient(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      error: error.message
    });
  }
};

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient
};

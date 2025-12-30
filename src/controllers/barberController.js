const barberService = require('../services/barberService');

// Criar barbeiro
const createBarber = async (req, res) => {
  try {
    const barber = await barberService.createBarber(req.body);
    return res.status(201).json({
      message: 'Barbeiro criado com sucesso',
      barber
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

// Listar todos os barbeiros
const getAllBarbers = async (req, res) => {
  try {
    const barbers = await barberService.getAllBarbers();
    return res.status(200).json({
      barbers
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

// Buscar barbeiro por ID
const getBarberById = async (req, res) => {
  try {
    const barber = await barberService.getBarberById(req.params.id);
    return res.status(200).json({
      barber
    });
  } catch (error) {
    return res.status(404).json({
      error: error.message
    });
  }
};

// Atualizar barbeiro
const updateBarber = async (req, res) => {
  try {
    const barber = await barberService.updateBarber(req.params.id, req.body);
    return res.status(200).json({
      message: 'Barbeiro atualizado com sucesso',
      barber
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

// Deletar barbeiro
const deleteBarber = async (req, res) => {
  try {
    const result = await barberService.deleteBarber(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      error: error.message
    });
  }
};

module.exports = {
  createBarber,
  getAllBarbers,
  getBarberById,
  updateBarber,
  deleteBarber
};

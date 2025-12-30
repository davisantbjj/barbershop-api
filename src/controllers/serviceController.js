const serviceService = require('../services/serviceService');

// Criar serviço
const createService = async (req, res) => {
  try {
    const service = await serviceService.createService(req.body);
    return res.status(201).json({
      message: 'Serviço criado com sucesso',
      service
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

// Listar todos os serviços
const getAllServices = async (req, res) => {
  try {
    const services = await serviceService.getAllServices();
    return res.status(200).json({
      services
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

// Buscar serviço por ID
const getServiceById = async (req, res) => {
  try {
    const service = await serviceService.getServiceById(req.params.id);
    return res.status(200).json({
      service
    });
  } catch (error) {
    return res.status(404).json({
      error: error.message
    });
  }
};

// Atualizar serviço
const updateService = async (req, res) => {
  try {
    const service = await serviceService.updateService(req.params.id, req.body);
    return res.status(200).json({
      message: 'Serviço atualizado com sucesso',
      service
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

// Deletar serviço
const deleteService = async (req, res) => {
  try {
    const result = await serviceService.deleteService(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      error: error.message
    });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
};

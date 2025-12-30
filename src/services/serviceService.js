const { Service } = require('../models');

// Criar serviço
const createService = async (data) => {
  const { name, description, price, duration } = data;

  if (!name || !price || !duration) {
    throw new Error('Nome, preço e duração são obrigatórios');
  }

  const service = await Service.create({ name, description, price, duration });
  return service;
};

// Listar todos os serviços
const getAllServices = async () => {
  const services = await Service.findAll({
    order: [['name', 'ASC']]
  });
  return services;
};

// Buscar serviço por ID
const getServiceById = async (id) => {
  const service = await Service.findByPk(id);
  if (!service) {
    throw new Error('Serviço não encontrado');
  }
  return service;
};

// Atualizar serviço
const updateService = async (id, data) => {
  const service = await Service.findByPk(id);
  if (!service) {
    throw new Error('Serviço não encontrado');
  }

  await service.update(data);
  return service;
};

// Deletar serviço
const deleteService = async (id) => {
  const service = await Service.findByPk(id);
  if (!service) {
    throw new Error('Serviço não encontrado');
  }

  await service.destroy();
  return { message: 'Serviço deletado com sucesso' };
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
};

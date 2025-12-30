const appointmentService = require('../services/appointmentService');

// Criar agendamento
const createAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.createAppointment(req.body);
    return res.status(201).json({
      message: 'Agendamento criado com sucesso',
      appointment
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

// Listar todos os agendamentos
const getAllAppointments = async (req, res) => {
  try {
    const filters = {
      barberId: req.query.barberId,
      clientId: req.query.clientId,
      status: req.query.status,
      date: req.query.date
    };

    const appointments = await appointmentService.getAllAppointments(filters);
    return res.status(200).json({
      appointments
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

// Buscar agendamento por ID
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await appointmentService.getAppointmentById(req.params.id);
    return res.status(200).json({
      appointment
    });
  } catch (error) {
    return res.status(404).json({
      error: error.message
    });
  }
};

// Atualizar agendamento
const updateAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.updateAppointment(req.params.id, req.body);
    return res.status(200).json({
      message: 'Agendamento atualizado com sucesso',
      appointment
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

// Cancelar agendamento
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.cancelAppointment(req.params.id);
    return res.status(200).json({
      message: 'Agendamento cancelado com sucesso',
      appointment
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

// Completar agendamento
const completeAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.completeAppointment(req.params.id);
    return res.status(200).json({
      message: 'Agendamento completado com sucesso',
      appointment
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

// Deletar agendamento
const deleteAppointment = async (req, res) => {
  try {
    const result = await appointmentService.deleteAppointment(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      error: error.message
    });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
  completeAppointment,
  deleteAppointment
};

const { Appointment, Client, Barber, Service } = require('../models');
const { Op } = require('sequelize');

// Criar agendamento
const createAppointment = async (data) => {
  const { clientId, barberId, serviceId, date, time, notes } = data;

  if (!clientId || !barberId || !serviceId || !date || !time) {
    throw new Error('Client, barbeiro, serviço, data e hora são obrigatórios');
  }

  // Combine date and time into a single Date object matching `data_hora`
  const dataHora = new Date(`${date}T${time}`);

  // Verificar se client existe
  const client = await Client.findByPk(clientId);
  if (!client) {
    throw new Error('Cliente não encontrado');
  }

  // Verificar se barbeiro existe
  const barber = await Barber.findByPk(barberId);
  if (!barber) {
    throw new Error('Barbeiro não encontrado');
  }

  // Verificar se serviço existe
  const service = await Service.findByPk(serviceId);
  if (!service) {
    throw new Error('Serviço não encontrado');
  }

  // Verificar se já existe agendamento no mesmo horário para o barbeiro
  const existingAppointment = await Appointment.findOne({
    where: {
      barberId,
      date: dataHora,
      status: {
        [Op.ne]: 'CANCELADO'
      }
    }
  });

  if (existingAppointment) {
    throw new Error('Barbeiro já possui agendamento neste horário');
  }

  const appointment = await Appointment.create({
    clientId,
    barberId,
    serviceId,
    date: dataHora,
    notes,
    status: 'AGENDADO'
  });

  return appointment;
};

// Listar todos os agendamentos
const getAllAppointments = async (filters = {}) => {
  const where = {};

  if (filters.barberId) {
    where.barberId = filters.barberId;
  }

  if (filters.clientId) {
    where.clientId = filters.clientId;
  }

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.date) {
    // expect filters.date to be a date string; compare by exact datetime if provided
    where.date = filters.date;
  }

  const appointments = await Appointment.findAll({
    where,
    include: [
      {
        model: Client,
        attributes: ['id', 'name', 'email', 'phone']
      },
      {
        model: Barber,
        attributes: ['id', 'name', 'email', 'specialization']
      },
      {
        model: Service,
        attributes: ['id', 'name', 'price', 'duration']
      }
    ],
    order: [['date', 'DESC']]
  });

  return appointments;
};

// Buscar agendamento por ID
const getAppointmentById = async (id) => {
  const appointment = await Appointment.findByPk(id, {
    include: [
      {
        model: Client,
        attributes: ['id', 'name', 'email', 'phone']
      },
      {
        model: Barber,
        attributes: ['id', 'name', 'email', 'specialization']
      },
      {
        model: Service,
        attributes: ['id', 'name', 'price', 'duration']
      }
    ]
  });

  if (!appointment) {
    throw new Error('Agendamento não encontrado');
  }

  return appointment;
};

// Atualizar agendamento
const updateAppointment = async (id, data) => {
  const appointment = await Appointment.findByPk(id);
  if (!appointment) {
    throw new Error('Agendamento não encontrado');
  }

  // Se alterar data/hora/barbeiro, verificar conflitos
  if (data.date || data.time || data.barberId) {
    const checkDateTime = data.date && data.time ? new Date(`${data.date}T${data.time}`) : appointment.date;
    const checkBarberId = data.barberId || appointment.barberId;

    const conflictAppointment = await Appointment.findOne({
      where: {
        id: { [Op.ne]: id },
        barberId: checkBarberId,
        date: checkDateTime,
        status: { [Op.ne]: 'CANCELADO' }
      }
    });

    if (conflictAppointment) throw new Error('Barbeiro já possui agendamento neste horário');
  }

  await appointment.update(data);
  return appointment;
};

// Cancelar agendamento
const cancelAppointment = async (id) => {
  const appointment = await Appointment.findByPk(id);
  if (!appointment) {
    throw new Error('Agendamento não encontrado');
  }

  if (appointment.status === 'CANCELADO') throw new Error('Agendamento já está cancelado');

  await appointment.update({ status: 'CANCELADO' });
  return appointment;
};

// Completar agendamento
const completeAppointment = async (id) => {
  const appointment = await Appointment.findByPk(id);
  if (!appointment) {
    throw new Error('Agendamento não encontrado');
  }

  if (appointment.status === 'CANCELADO') throw new Error('Não é possível completar um agendamento cancelado');

  await appointment.update({ status: 'CONCLUIDO' });
  return appointment;
};

// Deletar agendamento
const deleteAppointment = async (id) => {
  const appointment = await Appointment.findByPk(id);
  if (!appointment) {
    throw new Error('Agendamento não encontrado');
  }

  await appointment.destroy();
  return { message: 'Agendamento deletado com sucesso' };
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

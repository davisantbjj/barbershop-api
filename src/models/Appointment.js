const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Client = require('./Client');
const Barber = require('./Barber');
const Service = require('./Service');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  clientId: {
    type: DataTypes.BIGINT,
    field: 'cliente_id',
    references: {
      model: Client,
      key: 'id'
    },
    allowNull: false
  },
  barberId: {
    type: DataTypes.BIGINT,
    field: 'barbeiro_id',
    references: {
      model: Barber,
      key: 'id'
    },
    allowNull: false
  },
  serviceId: {
    type: DataTypes.BIGINT,
    field: 'service_id',
    references: {
      model: Service,
      key: 'id'
    },
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    field: 'data_hora',
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('AGENDADO', 'CANCELADO', 'CONCLUIDO'),
    defaultValue: 'AGENDADO'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'appointments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Relacionamentos
Appointment.belongsTo(Client, { foreignKey: 'cliente_id' });
Appointment.belongsTo(Barber, { foreignKey: 'barbeiro_id' });
Appointment.belongsTo(Service, { foreignKey: 'service_id' });

module.exports = Appointment;

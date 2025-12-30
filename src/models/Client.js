const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// The project uses a single `users` table for clients/admins/barbers.
// Map Client model to the `users` table so existing services/controllers work.
const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'nome'
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Client;

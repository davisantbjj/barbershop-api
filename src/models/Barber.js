const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Barber = sequelize.define('Barber', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.BIGINT,
    field: 'user_id',
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  especialidade: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    field: 'ativo'
  }
}, {
  tableName: 'barbers',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Barber.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Barber;

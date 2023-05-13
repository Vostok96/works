const db = require('../utils/database');
const {DataTypes} = require('sequelize');

const Works = db.define('works', {
    // id, title, description, completed
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
});

module.exports = Works;
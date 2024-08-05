'use strict';
const {
  Model
} = require('sequelize');
const person = require('./person');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      /**
       * Relacion one-to-many con Person
       * Indica que varios Attendance pueden pertenecer a una Person
       * En el modelo Person se agregó el hasMany(models.Attendance,...)
       */
      this.belongsTo(models.Person, {
        foreignKey: {
          type: DataTypes.UUIDV4,
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      })
    }
  }
  Attendance.init({
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    personId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hours: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Attendance',
    tableName: 'Attendances'
  }, {
    hooks: {
      beforeCreate: (record, options) => {
        record.dataValues.createdAt = new Date();
        record.dataValues.updatedAt = new Date();
      },
      beforeUpdate: (record, options) => {
        record.dataValues.updatedAt = new Date();
      }
    }
  });
  return Attendance;
};

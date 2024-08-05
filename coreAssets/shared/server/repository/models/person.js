'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      /**
       * Relacion one-to-many con Attendance
       * Indica que Person puede tener varios Attendance
       * En el modelo Attendance se agregó el belonsTo(models.Person,...)
       */
      this.hasMany(models.Attendance, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      })
    }
  }
  Person.init({
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    document: {
      type: DataTypes.STRING(20),
      unique: {
        arg: true,
        msg: '⚠️ Ya se registró a una persona con el mismo documento'
      },
      allowNull: false,
    },
    descriptor: {
      type: DataTypes.JSON
    }
  }, {
    sequelize,
    modelName: 'Person',
    tableName: 'Persons'
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
  return Person;
};

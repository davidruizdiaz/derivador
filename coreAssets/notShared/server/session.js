'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      /**
       * Relacion one-to-many con Attendance
       * Indica que Session puede tener varios Attendance
       * En el modelo Attendance se agregó el belonsTo(models.Session,...)
       */
      this.hasMany(models.Attendance, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      })
    }
  }
  Session.init({
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    numCaptures: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    initHour: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    endHour: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM,
      values: ['ACT', 'COM', 'INC'],
      allowNull: false,
      defaultValue: 'ACT',
    }
  }, {
    sequelize,
    modelName: 'Session',
    tableName: 'Sessions'
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
  return Session;
};

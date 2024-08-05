'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sessions', {
      id: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      description: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      numCaptures: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      initHour: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      endHour: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      state: {
        type: Sequelize.ENUM,
        values: ['ACT', 'COM', 'INC'],
        allowNull: false,
        defaultValue: 'ACT',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('Sessions', {
      fields: ['state'],
      type: 'check',
      where: {
        state: ['ACT', 'COM', 'INC']
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sessions');
  }
};

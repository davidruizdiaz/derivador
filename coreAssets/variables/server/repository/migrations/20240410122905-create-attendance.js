import { removeEmptyLines } from "../../../auxi.js";

export function genResource(variabilityPoints) {
  const vp = { ...variabilityPoints };
  return removeEmptyLines`
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Attendances', {
      id: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      personId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Persons',
          },
          key: 'id',
        },
        allowNull: false,
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      },
      ${vp[1]}
      hours: {
        type: Sequelize.STRING(10),
        allowNull: false,
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Attendances');
  }
};
`;
}
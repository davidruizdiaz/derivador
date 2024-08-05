'use strict';
const fs = require('fs').promises;
const path = require('path');
const dayjs = require('dayjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const persJSON = await fs.readFile(path.join(__dirname + '/data.json'), 'utf8');
    console.log(persJSON)
    const pers = JSON.parse(persJSON);
    await queryInterface.bulkInsert('Persons', pers);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Persons', null, {});
    await queryInterface.bulkDelete('Attendances', null, {});
  }
};

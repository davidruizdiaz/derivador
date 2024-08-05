/**
 * Submódulo con funciones de la aplicación y consultas a db.
 * @module comportamiento/persona
 */

const { Op } = require('sequelize');
const db = require('../models')

/**
 * Clase que implementa las operaciones a base de datos para Person.
 * @class
 * @method add
 * @method update
 * @method delete
 * @method getPersonById
 * @method getAllPersonsDescriptors
 * @method getPersonIdByDocument
 * @method searchPersonByNameOrDocument
 */
class PersonRepositoryBehavior {
  constructor() {
    this.person = db.Person;
    this.db = db;
  }

  /**
   * Guarda los datos de una persona.
   * @async
   * @param person {Object} Datos de la persona
   * @example
   * { name: string, document: string, descriptor: string }
   * @return {Object} Nueva persona
   * @example
   * { ok: boolean, person: { id: uuid, name: string, document: string } | msg: string }
   */
  async add(person) {
    try {
      const per = await this.person.create(person);
      return {
        ok: true,
        person: { name: per.name },
      };
    } catch (error) {
      console.error(error)
      return { ok: false, msg: 'Error: No se puedo completar la operación' };
    }
  }

  /**
   * Actualiza los datos de una persona.
   * @async
   * @param person {Object} Datos de la persona
   * @example
   * { id: uuid, name: string, document: string descriptor: string }
   * @return object
   * @example
   * { ok: boolean, person: { name: string } | msg: string }
   */
  async update(person) {
    try {
      const res = await this.person.update(person, {
        fields: ['name', 'document', 'descriptor'],
        where: { id: person.id },
      });
      if (!res) {
        return {
          ok: false,
          msg: 'No se pudieron actualizar los datos de la persona'
        };
      }
      return {
        ok: true,
        person: { name: person.name },
      };
    } catch (error) {
      console.error(error)
      return { ok: false, msg: 'Error: No se puedo completar la operación' };
    }
  }

  /**
   * Elimina una persona.
   * @async
   * @param id {uuid} Id de la persona
   * @returns {Object} Mensaje de confirmacion
   * @example
   * { ok: boolean, msg: string }
   */
  async delete(id) {
    try {
      const res = await this.person.destroy({
        where: { id: id },
      });
      if (!res) {
        return {
          ok: false,
          msg: 'No se pudieron eliminar los datos de la persona'
        };
      }
      return {
        ok: true,
        msg: 'Persona eliminada'
      };
    } catch (error) {
      console.error(error.name)
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return { ok: false, msg: error.name };
      }
      return { ok: false, msg: 'Error: No se puedo completar la operación' };
    }
  }

  /**
   * Recupera una persona por su id.
   * @async
   * @param id {uuid} Id de la persona
   * @return {Object} Datos de la persona
   * @example 
   * { ok: boolean, person: { id: uuid, name: string, document: string } | msg: string }
   */
  async getPersonById(id) {
    try {
      const { dataValues: per } = await this.person.findByPk(id, { attributes: ['id', 'name', 'document'] });
      if (!per) {
        return {
          ok: false,
          msg: 'No se encontró a la persona',
        };
      }
      return {
        ok: true,
        person: { ...per },
      };
    } catch (error) {
      console.error(error)
      return { ok: false, msg: 'Error: No se puedo completar la operación' };
    }
  }

  /**
   * Recupera los descriptors de todas la personas registradas.
   * @async
   * @returns {Object} Datos de personas registradas
   * @example
   * {
   *   ok: boolean,
   *   personDescriptors: [
   *     {
   *       label: string, 
   *       descriptors: [[],...]},
   *     {...},...
   *   ] | msg: string
   * }
   */
  async getAllPersonsDescriptors() {
    try {
      const pers = await this.person.findAll({
        attributes: ['descriptor'],
      });
      if (!pers) {
        return { ok: false, msg: 'No hay registros' };
      }
      return {
        ok: true,
        personsDescriptors: pers.map(per => {
          return {
            ...per.descriptor
          }
        }),
      };
    } catch (error) {
      console.error(error)
      return { ok: false, msg: 'Error: No se puedo completar la operación' };
    }
  }

  /**
   * Recupera el id de una persona por su documento.
   * @async
   * @param document {string} Documento de la persona
   * @return {Object} id de la persona
   */
  async getPersonIdByDocument(document) {
    try {
      const per = await this.person.findOne({ attributes: ['id', 'document'], where: { document } });
      if (!per) {
        return { ok: false, msg: 'No se encontró ninguna persona con ese documento' };
      }
      return { ok: true, personId: per.id };
    } catch (error) {
      console.log(error)
      return { ok: false, msg: 'Error: No se puedo completar la operación' };
    }
  }

  /**
   * Recupera datos de personas por su nombre o documento.
   * @async
   * @param searchedParam {string} Parámetro de búsqueda
   * @return {Array<object>} Array de personas
   * @example
   * {
   *   ok: boolean,
   *   persons: [
   *    { id: uuid, name: string, document: string }, ...
   *   ] | msg: string
   * }
   */
  async searchPersonByNameOrDocument(searchedParam) {
    try {
      const pers = await this.person.findAll({
        attributes: ['id', 'name', 'document'],
        where: {
          [Op.or]: [
            {
              name: { [Op.like]: `%${searchedParam}%` }
            }, {
              document: { [Op.like]: `%${searchedParam}%` }
            }
          ]
        },
        order: [['name', 'ASC']],
        limit: 20
      });
      if (!pers) {
        return { ok: false, msg: 'No se encontró ninguna persona con ese parámetro de búsqueda' };
      }
      return { ok: true, persons: [...pers] };
    } catch (error) {
      console.log(error)
      return { ok: false, msg: 'Error: No se puedo completar la operación' };
    }
  }
}

module.exports = PersonRepositoryBehavior;
